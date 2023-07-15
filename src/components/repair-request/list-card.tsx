/* this is a component that renders a card for each repair request */
import React from 'react';
import { Button,Card, CardActions, CardContent, Typography } from '@material-ui/core';

export default function ListCard(props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography color="textSecondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}



