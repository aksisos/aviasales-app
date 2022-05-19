/* eslint-disable react/prop-types */

import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Spin, Alert } from 'antd';

import Ticket from './ticket';

const TicketList = function TicketList({
  state,
  checkList,
  isCheapest,
  isLoading,
  isError,
}) {
  const key = useRef(0);

  const ticketSorter = (sort, tickets) => {
    const result = tickets.sort((prev, next) => {
      if (!sort) {
        return (
          prev.segments[0].duration +
          prev.segments[1].duration -
          (next.segments[0].duration + next.segments[1].duration)
        );
      }
      return prev.price - next.price;
    });
    return result;
  };

  const ticketsFilter = (filterOptions, array) => {
    let filterValue;
    if (filterOptions.length > 0) {
      filterValue = filterOptions.map((item) => {
        switch (item) {
        case 'Без пересадок':
          return 0;
        case '1 пересадка':
          return 1;
        case '2 пересадки':
          return 2;
        case '3 пересадки':
          return 3;
        default:
          return [];
        }
      });
    }

    if (filterOptions.length > 0) {
      const result = array.filter((item) => {
        if (filterValue.length === 1 && filterValue.includes(0)) {
          return (
            filterValue.includes(item.segments[0].stops.length) &&
            filterValue.includes(item.segments[1].stops.length)
          );
        }
        return (
          filterValue.includes(item.segments[0].stops.length) ||
          filterValue.includes(item.segments[1].stops.length)
        );
      });
      return result;
    }
    return array;
  };

  if (state.tickets.length > 0 && checkList.length > 0) {
    const filtredTickets = ticketsFilter(checkList, state.tickets);
    const sortedTickets = ticketSorter(isCheapest, filtredTickets);
    const firstFiveTickets = sortedTickets.slice(0, 5);
    const ticketsMap = firstFiveTickets.map((el) => {
      key.current += 1;
      return (
        el && (
          <Ticket
            key={key.current}
            price={el.price}
            carrier={el.carrier}
            to={el.segments[0]}
            from={el.segments[1]}
          />
        )
      );
    });

    return (
      <>
        {isLoading && <Spin tip="Loading..." />}
        {ticketsMap}
      </>
    );
  }

  if (state.tickets.length === 0 && isError) {
    return (
      <Alert
        message="Ошибка"
        description="Попробуйте обновить страницу"
        type="error"
      />
    );
  }

  if (isLoading && checkList.length !== 0) {
    return <Spin tip="Loading..." />;
  }

  return <div>Рейсов, подходящих под заданные фильтры, не найдено</div>;
};

const mapStateToProps = (state) => ({
  state,
  isLoading: state.isLoading,
  checkList: state.checkList,
  isCheapest: state.isCheapest,
  isError: state.isError,
});

export default connect(mapStateToProps, null)(TicketList);
