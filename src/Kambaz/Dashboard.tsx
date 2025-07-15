import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard" style={{ padding: "20px" }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />
      <div id="wd-dashboard-courses" style={{ marginTop: "20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", maxWidth: "1200px" }}>
          <div style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/CS4550/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS4550 Web Development
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Full Stack software development
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </div>

          <div style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/CS5610/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <div style={{ height: "160px", backgroundColor: "#0d6efd" }}></div>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS5610 Web Development
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Full Stack software development
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </div>

          <div style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/CS5200/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <div style={{ height: "160px", backgroundColor: "#6c757d" }}></div>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS5200 Database Management
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    SQL and database design
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </div>

          <div style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/CS5800/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS5800 Algorithms
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Algorithm design and analysis
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </div>

          <div style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/CS5500/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <div style={{ height: "160px", backgroundColor: "#28a745" }}></div>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS5500 Software Engineering
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Agile development practices
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </div>

          <div style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/CS5520/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <div style={{ height: "160px", backgroundColor: "#dc3545" }}></div>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS5520 Mobile Development
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    iOS and Android app development
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </div>

          <div style={{ width: "270px" }}>
            <Card>
              <Link to="/Kambaz/Courses/CS5004/Home"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <div style={{ height: "160px", backgroundColor: "#ffc107" }}></div>
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS5004 OOP Design
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Object-oriented programming in Java
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}