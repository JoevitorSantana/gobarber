//este é o arquivo de tooltips para a expliclação dos erros

import {Container} from './styles'

interface TooltipProps{
    title: string;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({title, className, children}) => {
    return (
        <Container className={className}>
            {children}
            <span>{title}</span>
        </Container>
    );
}

export default Tooltip
