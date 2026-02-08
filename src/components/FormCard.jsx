export default function FormCard({ title, subtitle, children }) {
  return (
    <section className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              {title && <h1 className="h4 mb-2">{title}</h1>}
              {subtitle && <p className="text-muted mb-4">{subtitle}</p>}
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
