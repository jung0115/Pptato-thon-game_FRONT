import { useCookies } from "react-cookie";
import client from 'gamja-backend-client';

const useHeaderModel = (initialExchange, initialProperty, selectExchange, selectProperty) => {
    const host = 'https://api.miruku.dog';

    const [isExchange, setExchange] = useState(initialExchange);
    const [isProperty, setProperty] = useState(initialProperty);
    const [isExchangeHover, setExchangeHover] = useState(false);
    const [isPropertyHover, setPropertyHover] = useState(false);
    const [isSelectLogin, setSelectLogin] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [cookies] = useCookies(['token']);

    // API 호출에 필요한 연결 설정
    const getConnection = () => {
        return {
            host: host,
            headers: {
                ...cookies.token ? {
                    'Authorization': `Bearer ${cookies.token}`
                } : {}
            }
        }
    }

    // 거래소탭 선택
    const onClickExchange = () => {
        setExchange(true);
        setProperty(false);
        selectExchange();
    }

    // 자산탭 선택
    const onClickProperty = () => {
        setExchange(false);
        setProperty(true);
        selectProperty();
    }

    // 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
        try {
            if (cookies.token) {
                const connection = getConnection();
                const response = await client.functional.user.me.getMyUser(connection);
                setTeamName(response.user.name);
            }
        } catch (error) {
            console.error("사용자 정보 가져오기 오류: ", error);
        }
    };

    // 탭 선택 변할 때마다 새로고침
    useEffect(() => {
    }, [isExchange, isProperty]);

    // 로그인 상태 확인 및 사용자 정보 설정
    useEffect(() => {
        fetchUserInfo();
    }, [cookies.token]);

    // 로그인 상태 변경 처리
    const loginClose = (name) => {
        setSelectLogin(false);
        setTeamName(name || '');
    };

    return { 
        isExchange, 
        isProperty, 
        isExchangeHover,
        isPropertyHover,
        isSelectLogin,
        teamName, 
        onClickExchange, 
        onClickProperty, 
        setExchangeHover,
        setPropertyHover,
        loginClose,
        setSelectLogin
    };
};
export default useHeaderModel;