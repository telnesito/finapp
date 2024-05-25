export function formatearNumero(numero) {
  return numero.replace(/(\d+)(\d{3})/, "$1.$2");
}