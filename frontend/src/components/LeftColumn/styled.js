import styled from 'styled-components';

export const Wrapper = styled.div`
    .draggable-card + .draggable-card {
        margin-top: 8px;
    }
`;

export const MonitorWrapper = styled.form`
    height: 200px;
    input,
    button {
        min-height: 30px;
        width: 100%;
    }

    .monitor-column {
        height: 100%;
        .monitor-row:first-child {
            height: 80%;
        }
        .monitor-row:nth-child(2) {
            height: 20%;
        }
    }
    input {
        width: calc(100% - 8px);
    }
    button {
        background-color: #4caf50;
        border: 0;
        color: white;
        border-radius: 12px;
    }
    input + input,
    input + button {
        margin-top: 8px;
    }
`;
