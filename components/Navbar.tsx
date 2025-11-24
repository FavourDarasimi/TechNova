const Navbar = () => {
  return (
    <nav className="flex sticky justify-between items-center p-5">
      <h1 className="tracking-widest text-2xl font-semibold">
        Tech<span className="text-blue-600">Nova</span>
      </h1>
      <ul className="flex gap-5">
        <li className="text-[18px]  border-transparent border-b-2 hover:border-blue-600 cursor-pointer transition duration-300 ease-in-out">
          Home
        </li>
        <li className="text-[18px]  border-transparent border-b-2 hover:border-blue-600 cursor-pointer transition duration-300 ease-in-out">
          Products
        </li>
        <li className="text-[18px]  border-transparent border-b-2 hover:border-blue-600 cursor-pointer transition duration-300 ease-in-out">
          Contact
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
