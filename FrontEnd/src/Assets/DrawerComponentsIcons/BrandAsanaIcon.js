import { SvgIcon } from "@mui/material";

const BrandAsanaIcon = (props) => (
  <SvgIcon
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...props} //Esto permite pasar propiedades adicionales
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="white" />
    <path d="M17 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="white" />
    <path d="M7 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="white" />
  </SvgIcon>
);

export default BrandAsanaIcon;
