const Header = (props) => {
  return (
    <header className="bg-blue-500">
      <h1 className="text-lg">{props.children}</h1>
    </header>
  );
};

export default Header;
