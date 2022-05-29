import React from 'react';
import {format, parse} from 'date-fns';

import classes from './ticket.module.scss';

const Ticket = function Ticket({
  price,
  carrier,
  to,
  from
}) {

  const stopsTo = to.stops.join(', ');
  const stopsFrom = from.stops.join(', ');

  const landingTime = (obj) => {
    const dateSLice = `${obj.date.slice(0, 10)}-${obj.date.slice(11, 16)}`;
    const dateTemplate = 'yyyy-MM-dd-HH:mm';
    let result = parse(dateSLice, dateTemplate, new Date());
    const endingTime = new Date(result);
    endingTime.setMinutes(result.getMinutes() + obj.duration);
    const durationTime = new Date(1995, 11, 17);
    durationTime.setMinutes(obj.duration);
    result = `${format(result, 'HH:mm')} - ${format(endingTime, 'HH:mm')}`;
    return {
      durationTime: format(durationTime, 'HHч mmм'),
      result
    };
  }; 

  const FlexibleEndings = (length) => {
    if (length === 1) {
      return 'ка';
    } else if (length === 0) {
      return 'ок';
    } else {
      return 'ки';
    }
  };

  return (
    <li className={classes.card}>
      <div className={classes.flex_wrapper}>
        <div className={classes.price}>{price} Р</div>  <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="carrier" /></div>
      <div className={classes.grid_wrapper}>
        <div className={classes.grid_item}>
          <div className={classes.route}> {to.origin} - {to.destination}</div>
          <div className={classes.time}>{landingTime(to).result}</div>
        </div>
        <div className={classes.grid_item}>
          <div className={classes.route}> В ПУТИ</div>
          <div className={classes.time}>{landingTime(to).durationTime}</div>
        </div>
        <div className={classes.grid_item}>
          <div className={classes.route}>{to.stops.length} пересад
            { FlexibleEndings(to.stops.length) }</div>
          <div className={classes.time}>{stopsTo}</div>
        </div>
        <div className={classes.grid_item}>
          <div className={classes.route}> {from.origin} - {from.destination}</div>
          <div className={classes.time}>{landingTime(from).result}</div>
        </div>
        <div className={classes.grid_item}>
          <div className={classes.route}> В ПУТИ</div>
          <div className={classes.time}>{landingTime(from).durationTime}</div>
        </div>
        <div className={classes.grid_item}>
          <div className={classes.route}>{from.stops.length} пересад
            { FlexibleEndings(from.stops.length) }</div>
          <div className={classes.time}>{stopsFrom}</div>
        </div>
      </div>
    </li>
  );
};

export default Ticket;
