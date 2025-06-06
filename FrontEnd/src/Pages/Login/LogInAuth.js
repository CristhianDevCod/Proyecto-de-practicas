import { Button, Result } from 'antd';
const LogInAuth = () => (
  <Result
    style={{ width: "100%", height: "100vh" }}
    status="500"
    title="500"
    subTitle="No has iniciado sesión, por favor inicia sesión"
    extra={
      <Button type="primary" href="/">
        Iniciar sesión
      </Button>
    }
  />
);
export default LogInAuth;
