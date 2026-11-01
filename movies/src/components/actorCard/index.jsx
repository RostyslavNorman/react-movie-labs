import { Link } from "react-router";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import img from "../../images/film-poster-placeholder.png";

export default function ActorCard({ person, subtitle, action }) {
  return (
    <Card>
      <CardActionArea component={Link} to={`/person/${person.id}`}>
        <CardMedia
          sx={{ height: 220 }}
          image={
            person.profile_path
              ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
              : img
          }
        />
        <CardContent>
          <Typography variant="subtitle1">{person.name}</Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      {action && <CardActions>{action(person)}</CardActions>}
    </Card>
  );
}