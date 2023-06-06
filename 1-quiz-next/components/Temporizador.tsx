import { CountdownCircleTimer } from '../node_modules/react-countdown-circle-timer/lib/index';
import styles from '../styles/Temporizador.module.css';

interface TemporizadorProps {
    key: any;
    duracao: number;
    tempoEsgotado: () => void;
}

export default function Temporizador(props: TemporizadorProps) {
    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer
                size={120}
                isPlaying
                duration={props.duracao}
                onComplete={props.tempoEsgotado}
                colors={['#bce596', '#F7B801', '#ed827a', '#ed827a']}
                colorsTime={[7, 4, 0]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    );
}
