import { 
    EventCardHorisontal,
    EventCardVertical 
} from "./EventCard";

interface Event {
    id: number;
    title: string;
    date: string;
    location: string;
    description: string;
}

const eventCards:Event[] = [
    {
      id: 1,
      title: "Бізнес-навчання",
      date: "22 травня 2023",
      location: "online",
      description: "Подорожуйте разом з експертами та діліться своїм досвідом.",
    },
    {
      id: 2,
      title: "Технологічна конференція",
      date: "23 травня 2023",
      location: "offline",
      description:
        "Подорожуйте разом з експертами та діліться своїм досвідом Подорожуйте разом з експертами та діліться своїм досвідом.",
    }
]
const Cards = () => {

    return (
        <div className='container grid-card-container'>
                <EventCardHorisontal 
                    area="lefttop"
                />
                <EventCardVertical 
                    area="right"
                />

                <EventCardHorisontal 
                    area="leftbottom"
                />
        </div>
    );
};

export default Cards;