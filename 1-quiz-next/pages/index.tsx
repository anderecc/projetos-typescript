import { useEffect, useState } from 'react';
import Questionario from '../components/Questionario';
import QuestaoModel from '../model/questao';
import { useRouter } from '../node_modules/next/router';
import axios from '../node_modules/axios/index';

const BASE_URL =
    'https://quiz-app-com-next-e-react-anderecc-anderecc.vercel.app/api';

export default function Home() {
    const router = useRouter();

    const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([]);
    const [questao, setQuestao] = useState<QuestaoModel>();
    const [respostasCertas, setRespostasCertas] = useState<number>(0);

    async function carregarIdsQuestoes() {
        const resp = await axios
            .get('/api/questionario')
            .then((res) => setIdsDasQuestoes(res.data));
    }
    async function carregarQuestao(idQuestao: number) {
        axios.get(`/api/questoes/${idQuestao}`).then((res) => {
            const novaQuestao = QuestaoModel.criarUsandoObjeto(res.data);
            setQuestao(novaQuestao);
        });
    }

    useEffect(() => {
        carregarIdsQuestoes();
    }, []);
    useEffect(() => {
        idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0]);
    }, [idsDasQuestoes]);

    function questaoRespondida(questaoRespondida: QuestaoModel) {
        setQuestao(questaoRespondida);
        const acertou = questaoRespondida.acertou;
        setRespostasCertas(respostasCertas + (acertou ? 1 : 0));
    }

    function idProximaPergunta() {
        const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1;
        return idsDasQuestoes[proximoIndice];
    }

    function irProximoPasso() {
        const proximoId = idProximaPergunta();
        proximoId ? irProximaQuestao(proximoId) : finalizar();
    }

    function irProximaQuestao(proximoId: number) {
        carregarQuestao(proximoId);
    }
    function finalizar() {
        router.push({
            pathname: '/resultado',
            query: {
                total: idsDasQuestoes.length,
                certas: respostasCertas,
            },
        });
    }

    return questao ? (
        <Questionario
            questao={questao}
            ultima={idProximaPergunta() === undefined}
            questaoRespondida={questaoRespondida}
            irProximoPasso={irProximoPasso}
        />
    ) : (
        false
    );
}
