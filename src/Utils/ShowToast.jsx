import Swal from "sweetalert2";

export const showToast = (title, text, icon = "success") => {
  Swal.fire({
    title,
    text,
    icon,
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};
