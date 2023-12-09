import { useSelector } from "react-redux";

function NavigationBar() {
  const { currentUser } = useSelector((state) => state.usersReducer);
  return(
    <>
      <nav className="py-2 bg-light border-bottom">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <a href="/" className="nav-link link-dark px-2 active" aria-current="page">Home</a>
            </li>
          </ul>
          {!currentUser && (
            <>
              <ul className="nav">
                <li className="nav-item">
                  <a href="/login" className="nav-link link-dark px-2">Login</a>
                </li>
              </ul>
              <ul className="nav">
                <li className="nav-item">
                  <a href="/register" className="nav-link link-dark px-2">Signup</a>
                </li>
              </ul>
            </>
          )}
          {currentUser && (
            <ul className="nav">
              <li className="nav-item">
                <a href="/profile" className="nav-link link-dark px-2">Profile</a>
              </li>
            </ul>
          )}
        </div>
      </nav>
      {JSON.stringify(currentUser)}
    </>
    

    // <header className="d-flex justify-content-center py-3">
    //   <ul className="nav nav-pills">
    //     <li className="nav-item">
    //       <a href="#" className="nav-link">Home</a>
    //     </li>
    //     <li className="nav-item">
    //       <a href="#" className="nav-link">User</a>
    //     </li>
    //   </ul>
    // </header>

    // <nav class="navbar navbar-expand-lg navbar-light bg-light">
    //   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    //     <span class="navbar-toggler-icon"></span>
    //   </button>
    //   <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    //     <a class="navbar-brand" href="#">Hidden brand</a>
    //     <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
    //       <li class="nav-item active">
    //         <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link" href="#">Link</a>
    //       </li>
    //       <li class="nav-item">
    //         <a class="nav-link disabled" href="#">Disabled</a>
    //       </li>
    //     </ul>
    //     <form class="form-inline my-2 my-lg-0">
    //       <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
    //       <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    //     </form>
    //   </div>
    // </nav>
  );
}
export default NavigationBar;