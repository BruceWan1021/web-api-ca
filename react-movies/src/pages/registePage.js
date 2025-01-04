import React from "react"; 
import RegisteForm from "../components/registerForm";

const RegistePage = () => {
    return (
        <div style={styles.container}>
            <h2>Registe TMDb</h2>
            <RegisteForm />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        maxWidth: '400px',
        margin: 'auto'
    }
};

export default RegistePage;
