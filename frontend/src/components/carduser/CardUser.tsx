/* eslint-disable react/prop-types */
import  IntDataUsers  from '../navbar/interfaces';
import { Card } from 'primereact/card';

interface CardProps {
    data: IntDataUsers;
}

const CardUser: React.FC<CardProps> = ({ data }) => {
 

    return (
            <Card title={`${data.name}`} className='m-2'
             style={{ border: '1px solid white', width: '15rem'}}>
                <p className="m-0">
                    <span className="font-bold">City:</span> {data.city}
                </p>
                <p className="m-0">
                    <span className="font-bold">Country:</span> {data.country}
                </p>
                <p className="m-0">
                    <span className="font-bold">Favorite Sport:</span> {data.favorite_sport}
                </p>
            </Card>
    );
}

export default CardUser;
