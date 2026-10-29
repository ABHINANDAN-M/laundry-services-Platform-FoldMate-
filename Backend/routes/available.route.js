



// const express = require("express");
// const router = express.Router();
// const { enableWashermanSlots } = require("../controllers/wavailable.controller");
// const { isAuth } = require("../middleware/isAuth");

// router.post("/slots/washer", isAuth, enableWashermanSlots);

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const {
//   enableWashermanSlots,
//   getAvailableSlots,
//   getAllWashermanSlotDates,
//   getAllAdminSlotTemplates
// } = require("../controllers/wavailable.controller");
// const { isAuth } = require("../middleware/isAuth");

// // 🧼 POST: Save or update washerman's enabled slots
// router.post("/slots/washer", isAuth, enableWashermanSlots);

// // 📆 GET: Get enabled slots for a specific date
// // e.g., /api/washerman/available-slots?washermanId=123&date=2025-07-01
// router.get("/available-slots", getAvailableSlots);

// // 📋 GET: Get all enabled slot dates for current washerman
// router.get("/washerman/slots", isAuth, getAllWashermanSlotDates);


// // 📋 Washerman gets all admin-defined slot templates
// router.get("/slot-templates", isAuth, getAllAdminSlotTemplates);

// // // ❌ DELETE: Remove slots for a specific date
// // router.delete("/washerman/slot", isAuth, deleteWashermanSlot);

// module.exports = router;





const express = require("express");
const router = express.Router();
const {
  enableWashermanSlots,
  getAvailableSlots,
  getAllWashermanSlotDates,
  getAllAdminSlotTemplates,
  getSlotBookingCounts // ✅ Add this
} = require("../controllers/wavailable.controller");
const { isAuth } = require("../middleware/isAuth");

// 🧼 POST: Save or update washerman's enabled slots
router.post("/slots/washer", isAuth, enableWashermanSlots);

// 📆 GET: Get enabled slots for a specific date
// e.g., /api/washerman/available-slots?washermanId=123&date=2025-07-01
router.get("/available-slots", getAvailableSlots);

// 📋 GET: Get all enabled slot dates for current washerman
router.get("/washerman/slots", isAuth, getAllWashermanSlotDates);

// 📋 Washerman gets all admin-defined slot templates
router.get("/slot-templates", isAuth, getAllAdminSlotTemplates);

// ✅ NEW: Washerman sees booked/maxBookings per slot for a specific date
// e.g., /api/washerman/slot-status?date=2025-07-06
router.get("/slot-status", isAuth, getSlotBookingCounts);

module.exports = router;




