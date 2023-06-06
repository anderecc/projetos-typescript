import Link from '../node_modules/next/link';
import styles from '../styles/Botao.module.css';

interface BotaoProps {
    href?: string;
    texto: string;
    onClick?: (e: any) => void;
}

export default function Botao(props: BotaoProps) {
    function renderizaBotao() {
        return (
            <button className={styles.botao} onClick={props.onClick}>
                {props.texto}
            </button>
        );
    }

    return props.href ? (
        <Link href={props.href}>{renderizaBotao()}</Link>
    ) : (
        renderizaBotao()
    );
}
