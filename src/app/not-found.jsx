import localFont from "next/font/local"; 
const myFont = localFont({ src: "../assets/fonts/Pacifico-Regular.ttf" });

const NotFound = () => {
  return (
    <div className="not-found vh-100 d-flex justify-content-center align-items-center text-blue-900" >
      <div style={myFont.style}>
        <h1 className="fw-bold">404 | Page not found ... </h1>
      </div>
    </div>
  );
};

export default NotFound;
