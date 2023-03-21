import React from 'react'
import { useInfiniteQuery } from 'react-query'
import { getPlaces, ResponsePlace } from '../services/CharacterService'
import PlaceCard from './PlaceCard'
import Spinner from './Spinner'

const Places = () => {
    const { 
        isLoading,
        isError,
        error,
        data,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery(['places'], 
                    getPlaces,
                    {
                        getNextPageParam: (lastPage: ResponsePlace) => {
                            const previousPage = lastPage.info.prev ? +lastPage.info.prev.split('=')[1] : 0
                            const currentPage = previousPage + 1;
                            if (currentPage === lastPage.info.pages) return false;
                            return currentPage + 1;
                        }
                    }
                     )
    if (isLoading) return <Spinner />

    window.addEventListener( "mousemove", handleMousemove, false );
    
    var edgeSize = 150;
    var timer = setTimeout( function() {}, 0 );
    
    function handleMousemove( event: MouseEvent ) {
        // Get the viewport-relative coordinates of the mousemove event.
        var viewportY = event.clientY;

        // Get the viewport dimensions.
		var viewportHeight = document.documentElement.clientHeight;

        //determine if the mouse is within the "edge" of the viewport
        //calculate the boundaries of the edge in the viewport
		var edgeBottom = ( viewportHeight - edgeSize );
        var isInBottomEdge = ( viewportY > edgeBottom );

        // If the mouse is not in the edge, then we can stop listening for
        if ( ! isInBottomEdge ) {
            clearTimeout( timer );
            return;

        }

        // Get the document dimensions.
        var documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.body.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight,
            document.documentElement.clientHeight
        );

        // Calculate the maximum scroll offset in each direction. Since you can only
		// scroll the overflow portion of the document, the maximum represents the
		// length of the document that is NOT in the viewport.
		var maxScrollY = ( documentHeight - viewportHeight );

        //we want to adjust the window scroll in
		// immediate response to the event; but, we also want to continue adjusting
		// the window scroll if the user rests their mouse in the edge boundary. To
		// do this, we'll invoke the adjustment logic immediately. Then, we'll setup
		// a timer that continues to invoke the adjustment logic while the window can
        (function checkForWindowScroll() {
 
            clearTimeout( timer );

            if ( adjustWindowScroll() ) {

                timer = setTimeout( checkForWindowScroll, 30 );

            }

        })();

        // Adjust the window scroll based on the user's mouse position. Returns True
		// or False depending on whether or not the window scroll was changed.
        function adjustWindowScroll() {
            // Get the current scroll position of the document.
			var currentScrollY = window.pageYOffset;

            // Determine if the window can be scrolled 
			var canScrollDown = ( currentScrollY < maxScrollY );


			var nextScrollY = currentScrollY;
            var maxStep = 5;
 
            // Should we scroll down?
			if ( isInBottomEdge && canScrollDown ) {
                // Calculate the intensity of the scroll based on the distance from the bottom
                // intensity = ( viewportY - edgeBottom ) / edgeSize )
				var intensity = 0.3;
				nextScrollY = ( nextScrollY + ( maxStep * intensity ) );
			}
			
            // Sanitize invalid maximums.
            nextScrollY = Math.max( 0, Math.min( maxScrollY, nextScrollY ) );
 
			if (nextScrollY !== currentScrollY) {
				window.scrollTo( 0, nextScrollY );
				return( true );
			} else {
				return( false );
			}
 
		}
 
	}

  return (
   <div>
        <div className='grid grid-cols-1 gap-4 p-10 flex-grow'>
            {data?.pages.map((page, index) => (
                <div key={index} className="grid grid-cols-4 gap-4">
                    {page.results.map((place, index) => (
                        <PlaceCard
                            key={index}
                            place={place}
                        />
                    ))}
                    </div>
            ))}
        </div>
        {hasNextPage && 
        <div className='fixed bottom-0 bg-gradient-to-t from-zinc-800 w-full h-1/5 z-20 flex justify-around
        hover:from-zinc-700'>
            <button 
            className='self-end mb-8 text-zinc-500 hover:text-zinc-300'
            onClick={()=>fetchNextPage()}>Load More</button>
        </div>}
   </div>
  )
}

export default Places