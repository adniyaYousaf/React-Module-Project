import "./Card.scss";

const Card = (props) => {
  return (
    <div className="card">
      <h2 className="card__title">{props.title}</h2>
      <a href={props.url}>
        <img className="card__image" src={props.src} alt="City Image" />
      </a>
    </div>
  );
};

export default Card;
