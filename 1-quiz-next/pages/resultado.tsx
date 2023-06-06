import styles from '../styles/Resultado.module.css';
import { useRouter } from '../node_modules/next/router';
import Estatistica from '../components/Estatistica';
import Botao from '../components/Botao';

export default function Resultado() {
    const router = useRouter();

    const total = +router.query.total;
    const certas = +router.query.certas;
    const percentual = Math.round((certas / total) * 100);

    return (
        <div className={styles.resultado}>
            <h1>Resultado </h1>
            <div style={{ display: 'flex' }}>
                <Estatistica texto="Perguntas" valor={total} />
                <Estatistica
                    texto="Certas"
                    valor={certas}
                    corFundo={'#9cd2a4'}
                />
                <Estatistica
                    texto="Percentual"
                    valor={`${percentual}%`}
                    corFundo={'#de6a33'}
                />
            </div>
            <Botao href="/" texto="Tentar Novamente" />
        </div>
    );
}
