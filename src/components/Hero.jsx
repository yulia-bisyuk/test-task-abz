import '../styles/components/hero/hero.css';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="container ">
        <div className="heroContentWrapper">
          <h1 className="heroTitle">Test assignment for front-end developer</h1>
          <p className="heroText">
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <button className="heroButton">Sign Up</button>
        </div>
      </div>
    </section>
  );
};
