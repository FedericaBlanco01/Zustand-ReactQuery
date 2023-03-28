function Home() {
  return (
    <div className="text-center p-64 text-black">
      <div className="p-12 rounded-md border border-green-500 bg-green-500 shadow-lg shadow-green-500 font-bold">
        <h1 className="mb-4">
          The purpose of this project is to learn the basics of ReactQuery and Zustand libraries. We decided to use the
          Rick and Morty API to manage data. Meanwhile the app was developed other curiosities arise, like the use of
          TailwindCSS, React Router, Virtualization, and more.
        </h1>
        <a href="https://github.com/FedericaBlanco01/Zustand-ReactQuery" className="text-black hover:text-white">
          Github Repo
        </a>
      </div>
    </div>
  );
}

export default Home;
