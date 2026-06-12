import React from 'react';
import { WHATSAPP_NUMBER } from '../config';

export default function WhatsAppButton() {
  const isPlaceholder = WHATSAPP_NUMBER === "PLACEHOLDER" || !WHATSAPP_NUMBER;
  const url = isPlaceholder
    ? "#"
    : `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20RojgarInBihar,%20I%20have%20a%20query.`;

  const handleClick = (e) => {
    if (isPlaceholder) {
      e.preventDefault();
      alert("WhatsApp Support Button is active! To connect your own WhatsApp Business account, open src/config.js and update the WHATSAPP_NUMBER variable.");
    }
  };

  return (
    <a
      href={url}
      className="whatsapp-float"
      target={isPlaceholder ? "_self" : "_blank"}
      rel="noopener noreferrer"
      onClick={handleClick}
      title="Contact WhatsApp Support"
    >
      <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.592 1.97 14.122.946 11.5.946c-5.423 0-9.849 4.373-9.854 9.802-.002 1.812.488 3.59 1.426 5.169L1.99 21.053l5.067-1.309zM17.486 15c-.287-.144-1.695-.837-1.957-.932-.262-.095-.453-.144-.643.144-.19.287-.738.932-.905 1.122-.167.19-.333.214-.62.071-2.247-1.127-3.86-2.07-5.416-4.734-.287-.492.287-.457.822-1.52.095-.19.048-.357-.024-.5-.071-.144-.643-1.548-.881-2.12-.231-.557-.468-.481-.643-.49-.167-.008-.357-.01-.548-.01-.19 0-.5.071-.762.357-.262.287-1 1.002-1 2.443 0 1.44 1.047 2.829 1.192 3.02.144.19 2.059 3.144 4.986 4.409.697.301 1.24.482 1.662.617.7.223 1.338.192 1.843.117.563-.083 1.695-.693 1.933-1.363.238-.669.238-1.24.167-1.363-.071-.122-.262-.19-.548-.334z" />
      </svg>
      <span className="whatsapp-text">Help Desk</span>
    </a>
  );
}
