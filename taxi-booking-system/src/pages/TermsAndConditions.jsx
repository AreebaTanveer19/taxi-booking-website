const TermsAndConditionsModal = ({isOpen, setIsOpen}) => {
  const closeModal = () => setIsOpen(false);

  return (
    <>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
            overflowY: "hidden"
          }}
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              maxWidth: "900px",
              width: "100%",
              maxHeight: "80vh",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              position: "relative",
              top: "35%", 
              bottom: "0"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>
                Terms and Conditions
              </h2>
              <button
                onClick={closeModal}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#6b7280",
                  padding: "0",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                ×
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              style={{
                padding: "24px",
                overflowY: "auto",
                fontSize: "16px",
                color: "#444",
                lineHeight: "1.6"
              }}
            >
              <strong>
                PLEASE READ CAREFULLY.
                <br />
                BY USING THIS SITE, YOU AGREE TO THESE TERMS OF USE.
              </strong>
              <br />
              <br />
              If you do not agree with any of the terms below, please do not use this site. Horizon Chauffeurs reserves the right to modify these terms at any time. Continued use of this site means you accept any changes.
              <br />
              <br />
              All content on this site—including images, text, promotions, and branding—is protected by copyright and may not be copied, reproduced, or distributed without written permission from Horizon Chauffeurs or its licensors.
              <br />
              <br />
              You may use this site for your own personal, non-commercial purposes only. Use of any material from this site on other websites is strictly prohibited. All trademarks and logos are the property of Horizon Chauffeurs or their respective owners. No license to use any trademark is granted without written consent.
              <br />
              <br />
              You agree to indemnify Horizon Chauffeurs, its affiliates, employees, and partners from any claims or liabilities arising from your use of this site or breach of these terms.
              <br />
              <br />
              All materials are provided "as is" without warranties of any kind. Horizon Chauffeurs is not liable for any offensive or illegal conduct by users.
              <br />
              <br />
              If you are dissatisfied with this site or any materials, your sole remedy is to discontinue use.
              <br />
              <br />
              By agreeing to these terms, you consent to us using your personal information for direct marketing. You may opt out at any time by contacting us at{" "}
              <a href="mailto:info@horizonchauffeurs.com.au">info@horizonchauffeurs.com.au</a>.
              <br />
              <br />
              This agreement is governed by the laws of New South Wales, Australia. Any disputes must be brought exclusively in the courts of New South Wales. If any part of this agreement is found invalid, the rest remains in effect.
              <br />
              <br />
              <strong>Ground Transportation</strong>
              <br />
              <br />
              <strong>Reservations:</strong>
              <br />
              We recommend booking your chauffeur service in advance to ensure availability. Please allow ample time for time-sensitive journeys. Pickup times are a guide only; Horizon Chauffeurs and its partners are not liable for delays or missed pickups.
              <br />
              <br />
              Online reservations made at least 12 hours in advance and confirmed by us are guaranteed, provided all booking details and payment information are correct. We cannot guarantee availability for last-minute bookings or without confirmation.
              <br />
              <br />
              Horizon Chauffeurs reserves the right to decline bookings if vehicles or drivers are unavailable. If we cannot fulfill a confirmed booking, we will notify you at least 12 hours in advance.
              <br />
              <br />
              <strong>No Shows:</strong>
              <br />
              If you do not see your driver at the pickup location, please call our dispatch at [your phone number]. If you leave without calling, you will be charged the full fare. The driver will wait up to 15 minutes (regular pickups) or up to 60 minutes (airport pickups). After this, if we cannot reach you, the ride will be released and you will be billed as a no-show.
              <br />
              <br />
              <strong>Cancellations & Changes:</strong>
              <br />- For sedans: You may cancel or change your booking up to 24 hours before pickup by emailing us. Cancellations within 24 hours will be charged the full fare.
              <br />- For vans, limousines, and special events: Cancellations must be made at least 24 hours in advance. After this, full charges apply. Deposits for weddings and formals are non-refundable.
              <br />
              <br />
              <strong>Damages:</strong>
              <br />
              You are responsible for any damage or excessive mess caused by you or your party. Cleaning or repair costs will be charged to you, and you will be notified before your card is charged.
              <br />
              <br />
              <strong>Payments:</strong>
              <br />
              Your card will be charged after the ride or according to our billing cycle. A pre-authorization may be placed on your card to validate it. For questions about pre-authorization, contact your financial institution.
              <br />
              <br />
              <strong>Disputes:</strong>
              <br />
              All charges are considered correct unless disputed in writing within 30 days. Disputes should be sent to info@horizonchauffeurs.com.au.
              <br />
              <br />
              <strong>Collection Fees:</strong>
              <br />
              You agree to pay all costs associated with collecting overdue payments, including legal and accounting fees.
              <br />
              <br />
              <strong>Wait Time:</strong>
              <br />
              A grace period is provided for airport and regular pickups. Additional wait time will be charged.
              <br />
              <br />
              <strong>Tolls & Fees:</strong>
              <br />
              All tolls, parking, and government charges are billed separately and are not included in quoted prices.
              <br />
              <br />
              <strong>Meet & Greet:</strong>
              <br />
              Meet & Greet service is available upon request. Parking and waiting charges may apply.
              <br />
              <br />
              <strong>Gratuity:</strong>
              <br />
              Tipping is at your discretion and not mandatory.
              <br />
              <br />
              <strong>Child Seats:</strong>
              <br />
              Child seats are available upon request for an additional fee. Please specify the age of the child when booking.
              <br />
              <br />
              <strong>Subcontracted Drivers:</strong>
              <br />
              We may use subcontracted drivers who are required to have appropriate licenses and insurance. Horizon Chauffeurs is not responsible for their actions but will assist in resolving any issues.
              <br />
              <br />
              <strong>Surcharges:</strong>
              <br />
              A 30% surcharge applies to transfers between 11pm and 5am (except special events). You will be notified of any surcharges before confirmation.
              <br />
              <br />
              <strong>Vehicle Allocation:</strong>
              <br />
              We will do our best to provide the requested vehicle type. If unavailable, a suitable alternative will be provided at no extra cost.
              <br />
              <br />
              <strong>Additional Stops:</strong>
              <br />
              Unscheduled stops will be charged accordingly.
              <br />
              <br />
              <strong>Multiple Airport Pickups:</strong>
              <br />
              If picking up from multiple flights, additional charges may apply.
              <br />
              <br />
              ---
              <br />
              <br />
              For the full, up-to-date terms and conditions, please visit:
              <br />
              <a
                href="https://www.horizonchauffeurs.com.au/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.horizonchauffeurs.com.au/terms-and-conditions
              </a>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "16px 24px",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
             
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermsAndConditionsModal;