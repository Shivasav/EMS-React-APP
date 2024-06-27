export const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <h5>Follow Us</h5>
        <div className="container p-1 pb-0">
          <section className="mb-2">
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: " #3b5998" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#dd4b39" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-google"></i>
            </a>

            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#ac2bac" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#0082ca" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: "#333333" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col text-center">
          <p className="mb-0">
            &copy; 2024 Shivasav's Employee Management System. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
