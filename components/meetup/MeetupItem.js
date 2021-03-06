import Card from '../ui/Card';
import styles from './MeetupItem.module.css';
//NEXTJS-ROUTER
import { useRouter } from 'next/router';


function MeetupItem({ id, image, title, address }) {
    const router = useRouter();

    const showDetailsHandler = () => {
        router.push(`/${id}`);
    }

    return (
        <li className={styles.item}>
            <Card>
                <div className={styles.image}>
                    <img src={image} alt={title} />
                </div>

                <div className={styles.content}>
                    <h3> {title} </h3>
                    <address> {address} </address>
                </div>

                <div className={styles.actions}>
                    <button onClick={showDetailsHandler}> Show Details </button>
                </div>
            </Card>
        </li>
    )
}

export default MeetupItem;