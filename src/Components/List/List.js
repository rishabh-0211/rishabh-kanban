import React from 'react';
import './List.css';
import Card from '../Card/Card';
import noPriority from '../../Assets/No-priority.svg';
import lowPriority from '../../Assets/Img - Low Priority.svg';
import medPriority from '../../Assets/Img - Medium Priority.svg';
import highPriority from '../../Assets/Img - High Priority.svg';
import urgentPriority from '../../Assets/SVG - Urgent Priority colour.svg';
import backlog from '../../Assets/Backlog.svg';
import todo from '../../Assets/To-do.svg';
import done from '../../Assets/Done.svg';
import inProgress from '../../Assets/in-progress.svg';
import cancelled from '../../Assets/Cancelled.svg';
import add from '../../Assets/add.svg';
import dotMenu from '../../Assets/3 dot menu.svg';

const getInitials = (name) => {
    if (typeof name === 'string' && name.length > 0) {
        const nameParts = name.split(' ');
        return nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
            : `${name[0]}`.toUpperCase();
    }
    return '';
};

export default function List(props) {
    const filteredTickets = props.ticketDetails.filter(ticket =>
        ticket.status === props.listTitle ||
        ticket.priority === props.listTitle ||
        ticket.userObj.name === props.listTitle
    );

    const cardCount = filteredTickets.length;

    return (
        <>
            <div className="list-container">
                <div className="list-header">
                    <div className="list-header-left">
                        {
                            {
                                'status': <>{
                                    {
                                        'Backlog': <div className="list-icon">
                                            <img src={backlog} alt="backlog" />
                                        </div>,
                                        'Todo': <div className="list-icon">
                                            <img src={todo} alt="todo" />
                                        </div>,
                                        'In progress': <div className="list-icon">
                                            <img src={inProgress} alt="in progress" />
                                        </div>,
                                        'Done': <div className="list-icon">
                                            <img src={done} alt="done" />
                                        </div>,
                                        'Cancelled': <div className="list-icon">
                                            <img src={cancelled} alt="cancelled" />
                                        </div>
                                    }[props.listTitle]
                                }</>,
                                'user': null,
                                'priority': <>{
                                    {
                                        0: <div className="card-tag-icon">
                                            <img src={noPriority} alt="no" />
                                        </div>,
                                        1: <div className="card-tag-icon">
                                            <img src={lowPriority} alt="low" />
                                        </div>,
                                        2: <div className="card-tag-icon">
                                            <img src={medPriority} alt="medium" />
                                        </div>,
                                        3: <div className="card-tag-icon">
                                            <img src={highPriority} alt="high" />
                                        </div>,
                                        4: <div className="card-tag-icon">
                                            <img src={urgentPriority} alt="urgent" />
                                        </div>
                                    }[props.listTitle]
                                }</>
                            }[props.groupValue]
                        }

                        <div className="list-title">
                            {
                                {
                                    'priority': <>{
                                        props.priorityList
                                            ? props.priorityList.map(priorityProperty => (
                                                priorityProperty.priority === props.listTitle
                                                    ? <>{priorityProperty.name}</>
                                                    : null
                                            ))
                                            : null
                                    }</>,
                                    'status': <>{props.listTitle}</>,
                                    'user': <>
                                        <div className="card-profile">
                                            <span className="card-profile-initial">{getInitials(props.listTitle)}</span>
                                        </div>
                                        <span>{props.listTitle}</span>
                                    </>
                                }[props.groupValue]
                            }
                        </div>

                        <div className="list-sum">{cardCount}</div>
                    </div>
                    <div className="list-header-right">
                        <div className="list-add-item">
                            <img src={add} alt="add" />
                        </div>
                        <div className="list-option-item">
                            <img src={dotMenu} alt="3 dots" />
                        </div>
                    </div>
                </div>

                <div className="list-card-items">
                    {
                        filteredTickets.map(ticket => (
                            <Card key={ticket.id} cardDetails={ticket} groupValue={props.groupValue} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}
