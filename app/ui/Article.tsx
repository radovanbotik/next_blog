import { Article as ArticleType } from "../lib/types";
import Card from "./Card";

export default function Article(props: ArticleType) {
  return (
    <Card as="article">
      <Card.Header as="time" dateTime={props.date} decorate>
        {props.date}
      </Card.Header>
      <Card.Title href={`/articles/${props.slug}`}>{props.title}</Card.Title>
      <Card.Description>{props.subtitle}</Card.Description>
      <Card.CTA>Read article</Card.CTA>
    </Card>
  );
}
