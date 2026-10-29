"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./CustomerDashboard.css"

const CustomerDashboard = () => {
  const fileInputRef = useRef(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [profile, setProfile] = useState({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    contact: "987-654-3210",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    address: "123 Main Street, Downtown, Mumbai, 400001",
    location: { lat: 19.076, lng: 72.8777 },
  })

  const [activePage, setActivePage] = useState("Home")
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isChangingPhoto, setIsChangingPhoto] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [tempProfile, setTempProfile] = useState({})
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Payment states
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [selectedUpiProvider, setSelectedUpiProvider] = useState("")
  const [paymentStep, setPaymentStep] = useState("method")

  // Notification state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  // Rating states
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [ratingOrder, setRatingOrder] = useState(null)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  // Reorder states
  const [showReorderModal, setShowReorderModal] = useState(false)
  const [reorderData, setReorderData] = useState(null)

  // Time slot modal states
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  // Service modal states
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [serviceModalView, setServiceModalView] = useState("overview")

  // Location and Service State
  const [customerLocation, setCustomerLocation] = useState(null)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [availableLaundrymen, setAvailableLaundrymen] = useState([])
  const [isLaundrymenLoading, setIsLaundrymenLoading] = useState(false)
  const [laundrymenError, setLaundrymenError] = useState(null)
  const [locationNotification, setLocationNotification] = useState("")

  // Booking State
  const [selectedServices, setSelectedServices] = useState([])
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null)
  const [selectedLaundryman, setSelectedLaundryman] = useState(null)
  const [selectedClothes, setSelectedClothes] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [orderTotal, setOrderTotal] = useState(0)

  // Tracking state
  const [trackingOrder, setTrackingOrder] = useState(null)
  const [showTrackingModal, setShowTrackingModal] = useState(false)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/booking", {
          withCredentials: true,
        });

        const updatedOrders = res.data.map(order => ({
          ...order,
          laundryman: order.laundryman || order.laundrymanName || "",
          total: order.total || order.totalAmount || 0,
        }));

        setOrders(updatedOrders);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setOrdersLoading(false);
      }
    };

    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/currentuser", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProfile({
          name: res.data.name,
          email: res.data.email,
          contact: res.data.contact,
          image: "/src/profile.png",
          _id: res.data._id,
          address: res.data.address || "123 Main Street, Downtown, Mumbai, 400001",
        });

        // If user has saved location in profile, use it
        if (res.data.location && res.data.location.coordinates) {
          const [lng, lat] = res.data.location.coordinates;
          setCustomerLocation({
            lat,
            lng,
            address: res.data.address || "Your saved location"
          });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
    fetchOrders();
  }, []);

  // Enhanced Services and Pricing
  const services = [
    {
      id: "wash_fold",
      name: "Wash & Fold",
      description: "Regular washing and folding service",
      icon: "👕",
      deliveryTime: "Same day - Next day",
      clothes: [
        { name: "Shirt", price: 25, image: "download.jpg" },
        { name: "T-Shirt", price: 20, image: "t shirt.jpg" },
        { name: "Pants", price: 30, image: "pants.jpg" },
        { name: "Jeans", price: 35, image: "jeans.jpg" },
        { name: "Jacket", price: 50, image: "jacket.jpg" },
      ],
    },
    {
      id: "dry_clean",
      name: "Dry Cleaning",
      description: "Professional dry cleaning service",
      icon: "🧥",
      deliveryTime: "Same day - Next day",
      clothes: [
        { name: "Shirt", price: 150, image: "download.jpg" },
        { name: "Jeans", price: 120, image: "jeans.jpg" },
        { name: "Jacket", price: 200, image: "jacket.jpg" },
      ],
    },
    {
      id: "iron_only",
      name: "Iron Only",
      description: "Professional ironing service",
      icon: "🔥",
      deliveryTime: "Same day",
      clothes: [
        { name: "Shirt", price: 15, image: "download.jpg" },
        { name: "T-Shirt", price: 10, image: "t shirt.jpg" },
        { name: "Pants", price: 20, image: "pants.jpg" },
        { name: "Jacket", price: 30, image: "jacket.jpg" },
      ],
    },
    {
      id: "stain_removal",
      name: "Stain Removal",
      description: "Specialized stain removal service",
      icon: "🧽",
      deliveryTime: "Same day - Next day",
      clothes: [
        { name: "Shirt", price: 50, image: "download.jpg" },
        { name: "Pants", price: 60, image: "pants.jpg" },
        { name: "Jacket", price: 100, image: "jacket.jpg" },
      ],
    },
    {
      id: "eco_friendly",
      name: "Eco-Friendly Wash",
      description: "Environment friendly washing with organic detergents",
      icon: "🌱",
      deliveryTime: "Same day - Next day",
      clothes: [
        { name: "Shirt", price: 30, image: "download.jpg" },
        { name: "T-Shirt", price: 25, image: "t shirt.jpg" },
        { name: "Pants", price: 35, image: "pants.jpg" },
      ],
    },
  ]

  const generateTimeSlots = (date) => {
    const today = new Date().toISOString().split("T")[0]
    const selectedDateObj = new Date(date)
    const todayObj = new Date(today)
    const isToday = date === today
    const isPastDate = selectedDateObj < todayObj
    const currentHour = new Date().getHours()

    let slots = [
      { id: 1, time: "06:00 - 09:00", available: 3, total: 5 },
      { id: 2, time: "09:00 - 12:00", available: 1, total: 5 },
      { id: 3, time: "12:00 - 15:00", available: 4, total: 4 },
      { id: 4, time: "15:00 - 18:00", available: 2, total: 3 },
      { id: 5, time: "18:00 - 21:00", available: 4, total: 6 },
    ]

    if (isPastDate) {
      return slots.map((slot) => ({
        ...slot,
        status: "unavailable",
        reason: "Date has passed",
      }))
    }

    if (isToday) {
      slots = slots.filter((slot) => {
        const slotHour = parseInt(slot.time.split(":")[0])
        return slotHour > currentHour
      })
    }

    return slots.map((slot) => ({
      ...slot,
      status: slot.available > 0 ? "available" : "full",
    }))
  }

  const [timeSlots, setTimeSlots] = useState(generateTimeSlots(selectedDate))

  const laundrymenData = [
    {
      id: 1,
      name: "Raj Kumar",
      experience: "5 years",
      location: { lat: 19.076, lng: 72.8777 },
      distance: 0.1,
      workingHours: "06:00 - 21:00",
      services: ["wash_fold", "iron_only", "eco_friendly"],
      image: "laundryman 1.jpg",
      phone: "+91 9876543210",
      specialties: ["Wash & fold", "Iron service", "Eco-friendly detergents"],
    },
    {
      id: 2,
      name: "Amit Singh",
      experience: "3 years",
      location: { lat: 19.0765, lng: 72.878 },
      distance: 0.3,
      workingHours: "07:00 - 19:00",
      services: ["wash_fold", "dry_clean", "stain_removal"],
      image: "laundryman 2.jpg",
      phone: "+91 9876543211",
      specialties: ["Suits & blazers", "Wedding dresses", "Leather cleaning"],
    },
    {
      id: 3,
      name: "Suresh Patel",
      experience: "7 years",
      location: { lat: 19.0755, lng: 72.8785 },
      distance: 0.4,
      workingHours: "05:00 - 20:00",
      services: ["wash_fold", "dry_clean", "iron_only", "stain_removal", "eco_friendly"],
      image: "laundryman 3.jpg",
      phone: "+91 9876543212",
      specialties: ["Eco friendly", "Premium ironing", "Stain removal expert"],
    },
  ]

  // Update time slots when date changes
  useEffect(() => {
    setTimeSlots(generateTimeSlots(selectedDate))
  }, [selectedDate])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  // Payment Functions
  const handleProceedToPay = () => {
    if (!selectedServices.length || !selectedTimeSlot || !selectedLaundryman || selectedClothes.length === 0) {
      alert("Please complete all selections before proceeding to payment")
      return
    }
    setShowPaymentModal(true)
    setPaymentStep("method")
  }

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method)
    if (method === "upi") {
      setPaymentStep("upi")
    } else if (method === "cod") {
      handlePlaceOrder("cod")
    }
  }

  const handleUpiProviderSelect = (provider) => {
    setSelectedUpiProvider(provider)
    setPaymentStep("processing")

    setTimeout(() => {
      setPaymentStep("success")
      setTimeout(() => {
        handlePlaceOrder("upi")
      }, 2000)
    }, 3000)
  }

  const upiProviders = [
    { id: "phonepe", name: "PhonePe", icon: "📱", color: "#5f259f" },
    { id: "googlepay", name: "Google Pay", icon: "🔵", color: "#4285f4" },
    { id: "paytm", name: "Paytm", icon: "💙", color: "#00baf2" },
    { id: "phonepe_upi", name: "PhonePe UPI", icon: "💳", color: "#5f259f" },
    { id: "googlepay_upi", name: "Google Pay UPI", icon: "💳", color: "#4285f4" },
    { id: "paytm_upi", name: "Paytm UPI", icon: "💳", color: "#00baf2" },
  ]

  // Profile Functions
  const handleEditProfile = () => {
    setTempProfile({ ...profile })
    setIsEditingProfile(true)
  }

  const handleChangePhoto = () => {
    setIsChangingPhoto(true)
    fileInputRef.current?.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
        if (isEditingProfile) {
          setTempProfile({ ...tempProfile, image: reader.result })
        } else {
          setProfile({ ...profile, image: reader.result })
          alert("Profile photo updated successfully!")
        }
      }
      reader.readAsDataURL(file)
    }
    setIsChangingPhoto(false)
  }

  const handleSaveProfile = () => {
    setProfile({ ...tempProfile })
    setIsEditingProfile(false)
    setPreviewImage(null)
    alert("Profile updated successfully!")
  }

  const handleCancelEdit = () => {
    setIsEditingProfile(false)
    setTempProfile({})
    setPreviewImage(null)
  }

  const handleChangePassword = () => {
    setIsChangingPassword(true)
  }

  const handleSavePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!")
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!")
      return
    }
    alert("Password changed successfully!")
    setIsChangingPassword(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
    alert(`Notifications ${!notificationsEnabled ? "enabled" : "disabled"}!`)
  }

  // Rating Functions
  const handleRateOrder = (order) => {
    setRatingOrder(order)
    setRating(order.rating || 0)
    setFeedback("")
    setShowRatingModal(true)
  }

  const handleSubmitRating = () => {
    if (rating === 0) {
      alert("Please select a rating")
      return
    }

    const updatedOrders = orders.map((order) => (order.id === ratingOrder.id ? { ...order, rating, feedback } : order))

    setOrders(updatedOrders)
    setShowRatingModal(false)
    setRatingOrder(null)
    setRating(0)
    setFeedback("")
    alert("Thank you for your feedback!")
  }

  // Reorder Functions
  const handleReorder = (order) => {
    const orderServices = order.services.map((serviceId) => services.find((s) => s.id === serviceId))
    setReorderData({
      ...order,
      services: orderServices,
      laundrymanName: order.laundryman,
      laundrymanObj: laundrymenData.find((l) => l.name === order.laundryman),
    })
    setShowReorderModal(true)
  }

  const confirmReorder = () => {
    if (!reorderData) return

    setSelectedServices(reorderData.services)
    setSelectedLaundryman(reorderData.laundrymanObj)
    setSelectedClothes(reorderData.items)
    setOrderTotal(reorderData.total)
    setPaymentMethod(reorderData.paymentMethod === "Cash on Delivery" ? "cod" : "upi")

    setShowReorderModal(false)
    setActivePage("Book")
    alert("Previous order details loaded! Please select date and time slot.")
  }

  // Time Slot Functions
  const handleShowTimeSlots = () => {
    setShowTimeSlotModal(true)
  }

  const handleSelectTimeSlot = (slot) => {
    if (slot.status === "available") {
      setSelectedTimeSlot(slot)
      setShowTimeSlotModal(false)
      alert(`Time slot ${slot.time} selected!`)
    }
  }

  const handleDateChange = (e) => {
    const newDate = e.target.value
    setSelectedDate(newDate)
    setSelectedTimeSlot(null)
  }

  const handleShowServices = () => {
    setServiceModalView("overview")
    setShowServiceModal(true)
  }

  const handleSelectServiceFromModal = (service) => {
    const isSelected = selectedServices.find((s) => s.id === service.id)

    if (isSelected) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id))
    } else {
      setSelectedServices([...selectedServices, service])
    }

    setSelectedClothes([])
    setOrderTotal(0)
  }

  const handleQuickSelectService = (service) => {
    const isSelected = selectedServices.find((s) => s.id === service.id)

    if (isSelected) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id))
    } else {
      setSelectedServices([...selectedServices, service])
    }

    setSelectedClothes([])
    setOrderTotal(0)
    setShowServiceModal(false)
    setActivePage("Book")
    alert(
      `${service.name} service ${isSelected ? "removed from" : "added to"} selection! Redirecting to booking page...`,
    )
  }

  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    setLocationNotification("📍 Detecting your location...");

    if (!navigator.geolocation) {
      setLocationNotification("❌ Geolocation is not supported by your browser.");
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const apiKey = "fbddd9ac0aff4feb840edc8d63a8f264";
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
          );
          const data = await response.json();
          if (data.status.code !== 200) {
            throw new Error("Reverse geocoding failed");
          }
          const address =
            data.results.length > 0
              ? data.results[0].formatted
              : `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          const location = {
            lat: latitude,
            lng: longitude,
            address,
          };
          setCustomerLocation(location);
          setLocationNotification(`✅ Location detected: ${address}`);
          
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const saveResponse = await axios.post(
                "http://localhost:5000/api/user/save-location",
                {
                  latitude,
                  longitude,
                  address
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  }
                }
              );
              
              if (saveResponse.status === 200) {
                console.log("Location saved to database successfully");
                setLocationNotification(`✅ Location saved: ${address}`);
              } else {
                console.error("Failed to save location to database");
                setLocationNotification("⚠️ Location detected but not saved");
              }
            } catch (error) {
              console.error("Error saving location to database:", error);
              setLocationNotification("⚠️ Location detected but not saved");
            }
          }
          
          setLocationNotification("🔍 Finding nearby washermen...");
          await findAvailableLaundrymen(location);
        } catch (error) {
          console.error("Geocoding error:", error);
          setLocationNotification("❌ Failed to get address from coordinates");
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        console.error("Location error:", error.message);
        setLocationNotification("❌ Could not detect location. Please allow location access.");
        const fallback = {
          lat: 19.076,
          lng: 72.8777,
          address: "Bandra West, Mumbai (Fallback)",
        };
        setCustomerLocation(fallback);
        setLocationNotification("📍 Using fallback location: Bandra West, Mumbai");
        findAvailableLaundrymen(fallback);
        setIsDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const findAvailableLaundrymen = async (location) => {
    setIsLaundrymenLoading(true);
    setLaundrymenError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/washer/nearby?lat=${location.lat}&lng=${location.lng}`);
      if (!response.ok) throw new Error('Failed to fetch laundrymen');
      const data = await response.json();
      const laundrymen = Array.isArray(data) ? data : [];
      setAvailableLaundrymen(laundrymen);
      
      if (laundrymen.length > 0) {
        setLocationNotification(`✅ Found ${laundrymen.length} nearby washermen!`);
      } else {
        setLocationNotification("⚠️ No washermen found in your area");
      }
    } catch (error) {
      setAvailableLaundrymen([]);
      setLaundrymenError('Could not load laundrymen. Please try again.');
      setLocationNotification("❌ Failed to load nearby washermen");
      console.error('Error fetching laundrymen:', error);
    } finally {
      setIsLaundrymenLoading(false);
    }
  };

  const handleServiceSelect = (service) => {
    const isSelected = selectedServices.find((s) => s.id === service.id)

    if (isSelected) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id))
    } else {
      setSelectedServices([...selectedServices, service])
    }

    setSelectedClothes([])
    setOrderTotal(0)
  }

  const getAvailableClothes = () => {
    const clothesMap = new Map()

    selectedServices.forEach((service) => {
      service.clothes.forEach((cloth) => {
        if (!clothesMap.has(cloth.name)) {
          clothesMap.set(cloth.name, {
            name: cloth.name,
            image: cloth.image,
            services: [],
          })
        }

        clothesMap.get(cloth.name).services.push({
          id: service.id,
          name: service.name,
          price: cloth.price,
          icon: service.icon,
        })
      })
    })

    return Array.from(clothesMap.values())
  }

  const handleClothSelect = (cloth, quantity, serviceId) => {
  const validQuantity = Math.max(1, Number(quantity) || 1);
  
  if (!cloth || !serviceId) return; // Add validation check

  const clothKey = `${cloth.name}_${serviceId}`;
  const existingIndex = selectedClothes.findIndex((item) => item.key === clothKey);
  const newClothes = [...selectedClothes];

  if (existingIndex >= 0) {
    if (validQuantity === 0) {
      newClothes.splice(existingIndex, 1);
    } else {
      newClothes[existingIndex] = {
        ...newClothes[existingIndex],
        quantity: validQuantity,
      };
    }
  } else if (validQuantity > 0) {
    const service = services.find((s) => s.id === serviceId);
    const serviceCloth = service?.clothes.find((c) => c.name === cloth.name);
    if (serviceCloth) {
      newClothes.push({
        ...serviceCloth,
        quantity: validQuantity,
        serviceId,
        key: clothKey,
        serviceName: service.name,
      });
    }
  }

  setSelectedClothes(newClothes);
  calculateTotal(newClothes);
};

  const handleAddClothService = (cloth, serviceId, price) => {
    const clothKey = `${cloth.name}_${serviceId}`
    const existingIndex = selectedClothes.findIndex((item) => item.key === clothKey)

    if (existingIndex >= 0) {
      const newClothes = [...selectedClothes]
      newClothes[existingIndex] = {
        ...newClothes[existingIndex],
        quantity: Number(newClothes[existingIndex].quantity) + 1,
      }
      setSelectedClothes(newClothes)
      calculateTotal(newClothes)
    } else {
      const service = services.find((s) => s.id === serviceId)
      const newItem = {
        name: cloth.name,
        price: Number(price),
        quantity: 1,
        serviceId: serviceId,
        key: clothKey,
        serviceName: service.name,
        image: cloth.image,
      }
      const newClothes = [...selectedClothes, newItem]
      setSelectedClothes(newClothes)
      calculateTotal(newClothes)
    }
  }

  const handleRemoveClothService = (clothName, serviceId) => {
    const clothKey = `${clothName}_${serviceId}`
    const newClothes = selectedClothes.filter((item) => item.key !== clothKey)
    setSelectedClothes(newClothes)
    calculateTotal(newClothes)
  }

  const calculateTotal = (clothes) => {
    const total = clothes.reduce((sum, item) => {
      const price = Number(item.price) || 0
      const quantity = Number(item.quantity) || 0
      return sum + (price * quantity)
    }, 0)
    setOrderTotal(total)
  }

  const handleTimeSlotSelect = (slot) => {
    if (slot.status === "available") {
      setSelectedTimeSlot(slot)
    }
  }

  const handleLaundrymanSelect = (laundryman) => {
    setSelectedLaundryman(laundryman)
  }

  const handlePlaceOrder = (finalPaymentMethod = null) => {
    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(3, "0")}`,
      date: selectedDate,
      time: selectedTimeSlot.time,
      laundryman: selectedLaundryman.name,
      status: "Confirmed",
      items: selectedClothes,
      total: orderTotal,
      paymentMethod: finalPaymentMethod === "cod" ? "Cash on Delivery" : "UPI",
      address: customerLocation?.address || profile.address,
      services: selectedServices.map((s) => s.id),
      rating: null,
    }

    setOrders([newOrder, ...orders])
    setShowOrderConfirmation(true)
    setShowPaymentModal(false)

    setSelectedServices([])
    setSelectedTimeSlot(null)
    setSelectedLaundryman(null)
    setSelectedClothes([])
    setOrderTotal(0)
    setSelectedPaymentMethod("")
    setSelectedUpiProvider("")
    setPaymentStep("method")
    setActivePage("Orders")
  }

  const handleLogout = () => {
    setShowLogoutPopup(true)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f39c12"
      case "Confirmed":
        return "#3498db"
      case "In Progress":
        return "#9b59b6"
      case "Ready for Pickup":
        return "#e67e22"
      case "Delivered":
        return "#27ae60"
      default:
        return "#95a5a6"
    }
  }

  const handleTrackOrder = (order) => {
    setTrackingOrder(order)
    setShowTrackingModal(true)
  }

  const getDeliveryTimeSlot = (orderDate) => {
    const today = new Date().toISOString().split("T")[0]
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const tomorrowStr = tomorrow.toISOString().split("T")[0]

    if (orderDate === today) return "Today"
    if (orderDate === tomorrowStr) return "Tomorrow"
    return "Tomorrow"
  }

  const getOrderProgress = (status) => {
    const statusMap = {
      Pending: 20,
      Confirmed: 40,
      "In Progress": 60,
      "Ready for Pickup": 80,
      Delivered: 100,
    }
    return statusMap[status] || 0
  }

  const getMinDate = () => {
    return new Date().toISOString().split("T")[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split("T")[0]
  }

  const handleDemoBooking = () => {
    const demoLocation = {
      lat: 19.076,
      lng: 72.8777,
      address: "Demo Location - Bandra West, Mumbai, Maharashtra",
    }

    setCustomerLocation(demoLocation)
    findAvailableLaundrymen(demoLocation)

    const rajKumar = laundrymenData.find((l) => l.id === 1)
    setSelectedLaundryman(rajKumar)

    const washFoldService = services.find((s) => s.id === "wash_fold")
    const ironService = services.find((s) => s.id === "iron_only")
    setSelectedServices([washFoldService, ironService])

    const demoClothes = [
      {
        name: "Shirt",
        price: 25,
        quantity: 3,
        serviceId: "wash_fold",
        key: "Shirt_wash_fold",
        serviceName: "Wash & Fold",
      },
      {
        name: "Pants",
        price: 30,
        quantity: 2,
        serviceId: "wash_fold",
        key: "Pants_wash_fold",
        serviceName: "Wash & Fold",
      },
    ]
    setSelectedClothes(demoClothes)
    calculateTotal(demoClothes)

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setSelectedDate(tomorrow.toISOString().split("T")[0])

    setActivePage("Book")
    alert("Demo booking setup complete! You can now select time slot and payment method.")
  }

  const handleContactLaundryman = (order) => {
    setContactOrder(order)
    setContactType("laundryman")
    setShowContactModal(true)
  }

  const handleCustomerSupport = (order = null) => {
    setContactOrder(order)
    setContactType("support")
    setShowContactModal(true)
  }

  const navigate = useNavigate();

  const confirmLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, {
        withCredentials: true
      });

      localStorage.removeItem('token');
      localStorage.removeItem('role');

      navigate('/mainapp');
    } catch (error) {
      console.error('Logout failed:', error);
      navigate('/mainapp');
    }
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className="dashboard-container">
      <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} style={{ display: "none" }} />

      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </button>

      {isSidebarOpen && <div className="mobile-menu-overlay" onClick={closeSidebar}></div>}

      <aside className={`sidebar ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-profile" onClick={() => { setActivePage("Profile"); closeSidebar(); }}>
          <img src={profile.image || "/placeholder.svg"} alt="Customer" className="sidebar-profile-img" />
          <span className="sidebar-profile-name">{profile.name}</span>
        </div>
        <nav>
          <button className={activePage === "Home" ? "active" : ""} onClick={() => { setActivePage("Home"); closeSidebar(); }}>
            🏠 Home
          </button>
          <button className={activePage === "Book" ? "active" : ""} onClick={() => { setActivePage("Book"); closeSidebar(); }}>
            📅 Book Service
          </button>
          <button className={activePage === "Orders" ? "active" : ""} onClick={() => { setActivePage("Orders"); closeSidebar(); }}>
            📦 My Orders
          </button>
          <button className={activePage === "Profile" ? "active" : ""} onClick={() => { setActivePage("Profile"); closeSidebar(); }}>
            👤 Profile
          </button>
          <button className="logout-btn" onClick={() => { handleLogout(); closeSidebar(); }}>
            🚪 Logout
          </button>
        </nav>
      </aside>

      <main className="main-content">
        {activePage === "Home" && (
          <div className="home-page">
            {locationNotification && (
              <section className="location-notification" style={{
                marginBottom: '16px',
                padding: '12px 16px',
                borderRadius: '8px',
                background: locationNotification.includes('✅') ? '#dcfce7' : 
                           locationNotification.includes('❌') ? '#fee2e2' : 
                           locationNotification.includes('⚠️') ? '#fef3c7' : '#dbeafe',
                border: locationNotification.includes('✅') ? '1px solid #22c55e' : 
                        locationNotification.includes('❌') ? '1px solid #ef4444' : 
                        locationNotification.includes('⚠️') ? '1px solid #f59e0b' : '1px solid #3b82f6',
                color: locationNotification.includes('✅') ? '#166534' : 
                       locationNotification.includes('❌') ? '#991b1b' : 
                       locationNotification.includes('⚠️') ? '#92400e' : '#1e40af',
                fontSize: '14px',
                fontWeight: '500'
              }}>
                {locationNotification}
              </section>
            )}

            <section className="nearby-washermen-section" style={{marginBottom: '32px', background: '#f8fafc', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb'}}>
              <h3 style={{marginBottom: '12px'}}>
                📍 Nearby Washermen 
                {customerLocation && (
                  <span style={{fontSize: '14px', fontWeight: 'normal', color: '#64748b'}}>
                    {" "}near {customerLocation.address}
                  </span>
                )}
              </h3>
              
              {isLaundrymenLoading && (
                <div style={{textAlign: 'center', padding: '20px', color: '#64748b'}}>
                  🔍 Loading nearby washermen...
                </div>
              )}
              
              {laundrymenError && (
                <div style={{textAlign: 'center', padding: '20px', color: '#ef4444'}}>
                  ❌ {laundrymenError}
                </div>
              )}
              
              {!isLaundrymenLoading && !laundrymenError && availableLaundrymen.length === 0 && (
                <div style={{textAlign: 'center', padding: '20px', color: '#64748b'}}>
                  ⚠️ No washermen found in your area
                </div>
              )}
              
              {!isLaundrymenLoading && !laundrymenError && availableLaundrymen.length > 0 && (
                <div className="nearby-washermen-list" style={{display: 'flex', gap: '16px', flexWrap: 'wrap'}}>
                  {availableLaundrymen.map((laundryman) => (
                    <div key={laundryman.id || laundryman._id} style={{
                      border: '1px solid #d1d5db', 
                      borderRadius: '8px', 
                      padding: '12px', 
                      background: '#fff', 
                      minWidth: '200px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                      <img 
                        src={laundryman.image || "/placeholder.svg"} 
                        alt={laundryman.name} 
                        style={{
                          width: '60px', 
                          height: '60px', 
                          borderRadius: '50%', 
                          objectFit: 'cover', 
                          marginBottom: '8px'
                        }} 
                      />
                      <h4 style={{margin: 0, color: '#1f2937'}}>{laundryman.name}</h4>
                      <div style={{fontSize: '13px', color: '#64748b'}}>
                        📞 {laundryman.phone || laundryman.contact || 'No phone'}
                      </div>
                      <div style={{fontSize: '13px', color: '#64748b'}}>
                        🕒 {laundryman.workingHours || 'Hours not specified'}
                      </div>
                      {laundryman.distance && (
                        <div style={{fontSize: '13px', color: '#10b981', fontWeight: '500'}}>
                          📍 {laundryman.distance} km away
                        </div>
                      )}
                      <div style={{marginTop: '6px'}}>
                        <strong style={{fontSize: '13px'}}>Services:</strong>
                        <ul style={{paddingLeft: '18px', margin: '4px 0 0 0', fontSize: '12px'}}>
                          {laundryman.services && laundryman.services.length > 0 ? (
                            laundryman.services.map((serviceId) => {
                              const service = services.find((s) => s.id === serviceId)
                              return <li key={serviceId}>{service?.icon} {service?.name || serviceId}</li>
                            })
                          ) : (
                            <li>No services listed</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="welcome-section">
              <div className="welcome-content">
                <h1>
                  {getGreeting()}, {profile.name}! 👋
                </h1>
                <p>Your trusted laundry service is just a click away</p>
              </div>
              <div className="date-time">
                <div className="current-date">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="current-time">
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </section>

            <section className="dashboard-stats">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📦</div>
                  <div className="stat-content">
                    <h3>Total Orders</h3>
                    <p className="stat-number">{orders.length}</p>
                    <span className="stat-label">All time</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-content">
                    <h3>Active Orders</h3>
                    <p className="stat-number">{orders.filter((o) => o.status !== "Delivered").length}</p>
                    <span className="stat-label">In progress</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">₹</div>
                  <div className="stat-content">
                    <h3>Total Spent</h3>
                    <p className="stat-number">₹{orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0)}</p>
                    <span className="stat-label">This month</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="quick-actions-section">
              <h3>Quick Actions</h3>
              <div className="quick-actions-grid">
                <button className="quick-action-btn" onClick={() => setActivePage("Book")}>
                  <div className="action-icon">📅</div>
                  <span>Book New Service</span>
                </button>

                <button className="quick-action-btn" onClick={() => setActivePage("Orders")}>
                  <div className="action-icon">📦</div>
                  <span>Track Orders</span>
                </button>
              </div>
            </section>

            <section className="recent-orders-section">
              <div className="section-header">
                <h3>Recent Orders</h3>
                <button className="view-all-btn" onClick={() => setActivePage("Orders")}>
                  View All
                </button>
              </div>

              <div className="recent-orders-list">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="recent-order-item">
                    <div className="order-info">
                      <h4>Order #{order.id}</h4>
                      <p>
                        {order.date} • {order.time}
                      </p>
                      <p>Laundryman: {order.laundryman}</p>
                    </div>
                    <div className="order-status">
                      <span className="status-badge" style={{ backgroundColor: getOrderStatusColor(order.status) }}>
                        {order.status}
                      </span>
                      <span className="order-total">₹{order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activePage === "Book" && (
          <div className="book-page">
            <div className="book-header">
              <h2>Book Laundry Service</h2>
              <p>Follow the steps below to book your laundry service</p>
            </div>

            <div className="booking-steps">
              <div className="booking-step">
                <div className="step-header">
                  <span className="step-number">1</span>
                  <h3>Set Your Location</h3>
                </div>

                <div className="location-section">
                  <div className="location-controls">
                    <button
                      className="detect-location-btn"
                      onClick={handleDetectLocation}
                      disabled={isDetectingLocation}
                    >
                      {isDetectingLocation ? "Detecting..." : "📍 Use Current Location"}
                    </button>
                  </div>

                  {customerLocation && (
                    <div className="location-info">
                      <p>
                        <strong>📍 Your Location:</strong> {customerLocation.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {customerLocation && (
                <div className="booking-step">
                  <div className="step-header">
                    <span className="step-number">2</span>
                    <h3>Choose Laundryman</h3>
                  </div>

                  <div className="laundrymen-grid">
                    {isLaundrymenLoading && <div>Loading laundrymen...</div>}
                    {laundrymenError && <div className="error-message">{laundrymenError}</div>}
                    {!isLaundrymenLoading && !laundrymenError && (
                      availableLaundrymen.length === 0 ? (
                        <div className="no-laundrymen">
                          <p>No laundrymen available in your area</p>
                          <span>Try a different location</span>
                        </div>
                      ) : (
                        availableLaundrymen.map((laundryman) => (
                          <div
                            key={laundryman.id || laundryman._id}
                            className={`laundryman-card ${selectedLaundryman?.id === laundryman.id || selectedLaundryman?._id === laundryman._id ? "selected" : ""}`}
                            onClick={() => handleLaundrymanSelect(laundryman)}
                          >
                            <img
                              src={laundryman.image || "/placeholder.svg"}
                              alt={laundryman.name}
                              className="laundryman-image"
                            />
                            <div className="laundryman-info">
                              <h4>{laundryman.name}</h4>
                              <div className="laundryman-details">
                                <span className="experience">{laundryman.experience}</span>
                                <span className="distance">📍 {laundryman.distance || ''} km</span>
                              </div>
                              <p className="working-hours">🕒 {laundryman.workingHours}</p>
                              <div className="services-offered">
                                {laundryman.services && laundryman.services.length > 0 ? (
                                  laundryman.services.map((serviceId) => {
                                    const service = services.find((s) => s.id === serviceId)
                                    return (
                                      <span key={serviceId} className="service-tag">
                                        {service?.icon} {service?.name || serviceId}
                                      </span>
                                    )
                                  })
                                ) : (
                                  <span className="service-tag">No services listed</span>
                                )}
                              </div>
                              <div className="specialties">
                                <strong>Specialties:</strong>
                                <div className="specialty-tags">
                                  {laundryman.specialties && laundryman.specialties.length > 0 ? laundryman.specialties.map((specialty, index) => (
                                    <span key={index} className="specialty-tag">
                                      {specialty}
                                    </span>
                                  )) : <span className="specialty-tag">None</span>}
                                </div>
                              </div>
                              <div className="contact-info">
                                <span className="phone">📞 {laundryman.phone || laundryman.contact}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      )
                    )}
                  </div>
                </div>
              )}

              {selectedLaundryman && (
                <div className="booking-step">
                  <div className="step-header">
                    <span className="step-number">3</span>
                    <h3>Select Service Types</h3>
                    <p className="step-subtitle">You can select multiple services</p>
                  </div>

                  <div className="services-grid">
                    {services.map((service) => {
                      const isSelected = selectedServices.find((s) => s.id === service.id)
                      const isAvailable = selectedLaundryman.services.includes(service.id)

                      return (
                        <div
                          key={service.id}
                          className={`service-card ${isSelected ? "selected" : ""} ${!isAvailable ? "unavailable" : ""}`}
                          onClick={() => {
                            if (isAvailable) {
                              handleServiceSelect(service)
                            } else {
                              alert(
                                `${selectedLaundryman.name} doesn't offer ${service.name} service. Please select a different service or laundryman.`,
                              )
                            }
                          }}
                        >
                          <div className="service-icon">{service.icon}</div>
                          <h4>{service.name}</h4>
                          <p className="service-description">{service.description}</p>
                          <div className="service-preview-booking">
                            <div className="price-info">
                              Starting ₹{Math.min(...service.clothes.map((c) => c.price))}
                            </div>
                          </div>
                          {isSelected && <div className="selected-indicator">✓ Selected</div>}
                        </div>
                      )
                    })}
                  </div>

                  {selectedServices.length > 0 && (
                    <div className="selected-services-summary">
                      <h4>Selected Services:</h4>
                      <div className="selected-services-list">
                        {selectedServices.map((service) => (
                          <span key={service.id} className="selected-service-tag">
                            {service.icon} {service.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedServices.length > 0 && (
                <div className="booking-step">
                  <div className="step-header">
                    <span className="step-number">4</span>
                    <h3>Select Clothes & Services</h3>
                    <p className="step-subtitle">Choose clothes and select services with individual pricing</p>
                  </div>

                  <div className="clothes-selection-enhanced">
                    <div className="selection-guide">
                      <div className="guide-item">
                        <span className="guide-icon">👗</span>
                        <span>
                          Use the dropdown to select multiple services for the same item (e.g., Dry Clean + Iron for one
                          shirt)
                        </span>
                      </div>
                      <div className="guide-item">
                        <span className="guide-icon">💰</span>
                        <span>Each service has different pricing - add multiple services to see combined cost</span>
                      </div>
                    </div>

                    {getAvailableClothes().map((cloth) => (
                      <div key={cloth.name} className="cloth-card-dropdown">
                        <div className="cloth-header-dropdown">
                          <div className="cloth-image-dropdown">
                            <img src={cloth.image || "/placeholder.svg"} alt={cloth.name} />
                            <div className="cloth-overlay">
                              <span className="cloth-name">{cloth.name}</span>
                            </div>
                          </div>
                          <div className="cloth-info-dropdown">
                            <h5>{cloth.name}</h5>
                            <p className="available-services-text">
                              Available in {cloth.services.length} service{cloth.services.length > 1 ? "s" : ""}
                            </p>
                            <div className="service-badges">
                              {cloth.services.map((service) => (
                                <span key={service.id} className="service-badge">
                                  {service.icon} {service.name} - ₹{service.price}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="service-selection-dropdown">
                          <h6>Add Services for {cloth.name}:</h6>

                          <div className="add-service-section">
                            <div className="service-dropdown-container">
                              <select
                                className="service-dropdown"
                                onChange={(e) => {
                                  if (e.target.value) {
                                    const serviceId = e.target.value
                                    const service = cloth.services.find((s) => s.id === serviceId)
                                    handleAddClothService(cloth, serviceId, service.price)
                                    e.target.value = ""
                                  }
                                }}
                              >
                                <option value="">Select a service to add...</option>
                                {cloth.services.map((service) => {
                                  const alreadySelected = selectedClothes.find(
                                    (item) => item.name === cloth.name && item.serviceId === service.id,
                                  )
                                  return (
                                    <option key={service.id} value={service.id} disabled={alreadySelected}>
                                      {service.icon} {service.name} - ₹{service.price}
                                      {alreadySelected ? " (Already added)" : ""}
                                    </option>
                                  )
                                })}
                              </select>
                            </div>
                          </div>

                          <div className="selected-services-for-cloth">
                            {selectedClothes
                              .filter((item) => item.name === cloth.name)
                              .map((item) => (
                                <div key={item.key} className="selected-service-item">
                                  <div className="service-item-header">
                                    <div className="service-info">
                                      <span className="service-icon">
                                        {services.find((s) => s.id === item.serviceId)?.icon}
                                      </span>
                                      <span className="service-name">{item.serviceName}</span>
                                      <span className="service-price">₹{item.price} each</span>
                                    </div>
                                    <button
                                      className="remove-service-btn"
                                      onClick={() => handleRemoveClothService(cloth.name, item.serviceId)}
                                      title="Remove this service"
                                    >
                                      ✕
                                    </button>
                                  </div>

                                  <div className="quantity-controls-dropdown">
                                    <label>Quantity:</label>
                                    <div className="quantity-input-group">
                                      <button
                                        className="quantity-btn-dropdown minus"
                                        onClick={() => {
                                          const newQuantity = Math.max(1, Number(item.quantity) - 1)
                                          handleClothSelect(cloth, newQuantity, item.serviceId)
                                        }}
                                        disabled={Number(item.quantity) <= 1}
                                      >
                                        −
                                      </button>
                                      <input
                                        type="number"
                                        className="quantity-input"
                                        value={Number(item.quantity)}
                                        min="1"
                                        max="99"
                                        onChange={(e) => {
                                          const newQuantity = Math.max(1, Number(e.target.value) || 1)
                                          handleClothSelect(cloth, newQuantity, item.serviceId)
                                        }}
                                      />
                                      <button
                                        className="quantity-btn-dropdown plus"
                                        onClick={() => {
                                          const newQuantity = Number(item.quantity) + 1
                                          handleClothSelect(cloth, newQuantity, item.serviceId)
                                        }}
                                      >
                                        +
                                      </button>
                                    </div>
                                    <span className="item-total">Total: ₹{Number(item.price) * Number(item.quantity)}</span>
                                  </div>
                                </div>
                              ))}
                          </div>

                          {(() => {
                            const clothItems = selectedClothes.filter((item) => item.name === cloth.name)
                            const clothTotal = clothItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
                            const clothQuantity = clothItems.reduce((sum, item) => sum + Number(item.quantity), 0)

                            return clothTotal > 0 ? (
                              <div className="cloth-total-summary">
                                <div className="cloth-summary-header">
                                  <span className="cloth-total-text">
                                    {cloth.name} Summary: {clothQuantity} item{clothQuantity > 1 ? "s" : ""} across{" "}
                                    {clothItems.length} service{clothItems.length > 1 ? "s" : ""}
                                  </span>
                                  <span className="cloth-total-amount">₹{clothTotal}</span>
                                </div>
                                <div className="cloth-services-breakdown">
                                  {clothItems.map((item) => (
                                    <span key={item.key} className="service-breakdown">
                                      {item.serviceName}: {item.quantity}x ₹{item.price} = ₹{Number(item.price) * Number(item.quantity)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ) : null
                          })()}
                        </div>
                      </div>
                    ))}

                    {selectedClothes.length > 0 && (
                      <div className="order-summary-enhanced">
                        <div className="summary-header">
                          <h4>📋 Complete Order Summary</h4>
                          <span className="total-items">
                            {selectedClothes.reduce((sum, item) => sum + Number(item.quantity), 0)} items across{" "}
                            {selectedClothes.length} service selections
                          </span>
                        </div>

                        <div className="summary-by-service">
                          {selectedServices.map((service) => {
                            const serviceItems = selectedClothes.filter((item) => item.serviceId === service.id)
                            const serviceTotal = serviceItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)

                            return serviceItems.length > 0 ? (
                              <div key={service.id} className="service-summary-section">
                                <div className="service-summary-header">
                                  <span className="service-icon">{service.icon}</span>
                                  <span className="service-name">{service.name}</span>
                                  <span className="service-total">₹{serviceTotal}</span>
                                </div>
                                <div className="service-items">
                                  {serviceItems.map((item) => (
                                    <div key={item.key} className="service-item-detail">
                                      <span>
                                        {item.name} x {item.quantity}
                                      </span>
                                      <span>₹{Number(item.price) * Number(item.quantity)}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : null
                          })}
                        </div>

                        <div className="summary-total-enhanced">
                          <div className="total-row">
                            <span className="total-label">Grand Total:</span>
                            <span className="total-amount">₹{orderTotal}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedClothes.length > 0 && (
                <div className="booking-step">
                  <div className="step-header">
                    <span className="step-number">5</span>
                    <h3>Choose Date</h3>
                  </div>

                  <div className="date-selection">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="date-input"
                    />
                    <p className="date-info">
                      Selected:{" "}
                      {new Date(selectedDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}

              {selectedDate && (
                <div className="booking-step">
                  <div className="step-header">
                    <span className="step-number">6</span>
                    <h3>Choose Time Slot</h3>
                  </div>

                  <div className="time-slots-grid">
                    {timeSlots.length === 0 ? (
                      <div className="no-slots">
                        <p>No time slots available for selected date</p>
                        <span>All slots have passed for today</span>
                      </div>
                    ) : (
                      timeSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className={`time-slot ${slot.status} ${selectedTimeSlot?.id === slot.id ? "selected" : ""}`}
                          onClick={() => handleTimeSlotSelect(slot)}
                        >
                          <div className="slot-time">{slot.time}</div>
                          <div className="slot-availability">
                            {slot.status === "available" ? (
                              <>
                                <span className="available-icon">✅</span>
                                <span>
                                  {slot.available}/{slot.total} available
                                </span>
                              </>
                            ) : slot.status === "full" ? (
                              <>
                                <span className="full-icon">❌</span>
                                <span>Slot Full</span>
                              </>
                            ) : (
                              <>
                                <span className="unavailable-icon">🚫</span>
                                <span>Unavailable</span>
                                {slot.reason && (
                                  <div className="unavailable-reason">{slot.reason}</div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {selectedTimeSlot && (
                    <div className="proceed-to-pay-section">
                      <button className="proceed-to-pay-btn" onClick={handleProceedToPay}>
                        💳 Proceed to Pay - ₹{orderTotal}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activePage === "Orders" && (
          <div className="orders-page">
            <div className="orders-header">
              <h2>My Orders</h2>
              <p>Track and manage your laundry orders</p>
            </div>

            <div className="orders-list">
              {orders.length === 0 ? (
                <div className="no-orders">
                  <div className="no-orders-icon">📦</div>
                  <h3>No orders yet</h3>
                  <p>Book your first laundry service to get started</p>
                  <button className="book-now-btn" onClick={() => setActivePage("Book")}>
                    Book Now
                  </button>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div className="order-id">
                        <h3>Order #{order.id}</h3>
                        <span className="order-date">
                          {order.date} • {order.time}
                        </span>
                      </div>
                      <span className="status-badge" style={{ backgroundColor: getOrderStatusColor(order.status) }}>
                        {order.status}
                      </span>
                    </div>

                    <div className="order-details">
                      <div className="order-info">
                        <p>
                          <strong>👤 Laundryman:</strong> {order.laundryman}
                        </p>
                        <p>
                          <strong>📍 Address:</strong> {order.address}
                        </p>
                        <p>
                          <strong>💳 Payment:</strong> {order.paymentMethod}
                        </p>
                        <p>
                          <strong>🧺 Services:</strong>{" "}
                          {order.services
                            .map((serviceId) => services.find((s) => s.id === serviceId)?.name)
                            .join(", ") || "N/A"}
                        </p>
                      </div>

                      <div className="order-items">
                        <h4>Items:</h4>
                        <div className="items-list">
                          {order.items.map((item, index) => (
                            <div key={index} className="item">
                              <span>
                                {item.name} x {item.quantity} {item.serviceName && `(${item.serviceName})`}
                              </span>
                              <span>₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                        <div className="order-total">
                          <strong>Total: ₹{order.total}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="order-actions">
                      {order.status === "Delivered" && (
                        <button className="rate-btn" onClick={() => handleRateOrder(order)}>
                          ⭐ {order.rating ? "Update Rating" : "Rate Service"}
                        </button>
                      )}
                      {order.status !== "Delivered" && (
                        <button className="track-btn" onClick={() => handleTrackOrder(order)}>
                          📍 Track Order
                        </button>
                      )}
                      <button className="reorder-btn" onClick={() => handleReorder(order)}>
                        🔄 Reorder
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activePage === "Profile" && (
          <div className="profile-page">
            <div className="profile-header">
              <h2>My Profile</h2>
              <p>Manage your account information</p>
            </div>

            <div className="profile-content">
              <div className="profile-card">
                {!isEditingProfile ? (
                  <>
                    <div className="profile-image-section">
                      <img src={profile.image || "/placeholder.svg"} alt="Profile" className="profile-image" />
                    </div>

                    <div className="profile-info">
                      <div className="info-group">
                        <label>Full Name</label>
                        <p>{profile.name}</p>
                      </div>

                      <div className="info-group">
                        <label>Email Address</label>
                        <p>{profile.email}</p>
                      </div>

                      <div className="info-group">
                        <label>Phone Number</label>
                        <p>{profile.contact}</p>
                      </div>

                      <div className="info-group">
                        <label>Address</label>
                        <p>{profile.address}</p>
                      </div>

                      <div className="profile-actions">
                        <button className="edit-profile-btn" onClick={handleEditProfile}>
                          ✏️ Edit Profile
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="edit-profile-form">
                    <div className="profile-image-section">
                      <img
                        src={previewImage || tempProfile.image || profile.image || "/placeholder.svg"}
                        alt="Profile Preview"
                        className="profile-image"
                      />
                      <button type="button" className="change-image-btn" onClick={() => fileInputRef.current?.click()}>
                        📷 Change Photo
                      </button>
                    </div>

                    <div className="profile-form">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          value={tempProfile.name || ""}
                          onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          value={tempProfile.email || ""}
                          onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="contact">Phone Number</label>
                        <input
                          type="tel"
                          id="contact"
                          value={tempProfile.contact || ""}
                          onChange={(e) => setTempProfile({ ...tempProfile, contact: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <textarea
                          id="address"
                          value={tempProfile.address || ""}
                          onChange={(e) => setTempProfile({ ...tempProfile, address: e.target.value })}
                          rows={3}
                          required
                        />
                      </div>

                      <div className="profile-actions">
                        <button type="button" className="save-profile-btn" onClick={handleSaveProfile}>
                          💾 Save Changes
                        </button>
                        <button type="button" className="cancel-edit-btn" onClick={handleCancelEdit}>
                          ❌ Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="popup-overlay">
          <div className="popup-content payment-modal">
            <div className="payment-header">
              <h3>
                {paymentStep === "method" && "Choose Payment Method"}
                {paymentStep === "upi" && "Select UPI Provider"}
                {paymentStep === "processing" && "Processing Payment"}
                {paymentStep === "success" && "Payment Successful"}
              </h3>
              {paymentStep !== "processing" && paymentStep !== "success" && (
                <button className="close-btn" onClick={() => setShowPaymentModal(false)}>
                  ✕
                </button>
              )}
            </div>

            <div className="payment-content">
              {paymentStep === "method" && (
                <div className="payment-methods">
                  <div className="order-summary-payment">
                    <h4>Order Summary</h4>
                    <div className="summary-details">
                      <div className="detail-row">
                        <span>Services:</span>
                        <span>{selectedServices.map((s) => s.name).join(", ")}</span>
                      </div>
                      <div className="detail-row">
                        <span>Laundryman:</span>
                        <span>{selectedLaundryman?.name}</span>
                      </div>
                      <div className="detail-row">
                        <span>Date & Time:</span>
                        <span>
                          {selectedDate} • {selectedTimeSlot?.time}
                        </span>
                      </div>
                      <div className="detail-row total-row">
                        <span>Total Amount:</span>
                        <span>₹{orderTotal}</span>
                      </div>
                    </div>
                  </div>

                  <div className="payment-options">
                    <div
                      className={`payment-option ${selectedPaymentMethod === "upi" ? "selected" : ""}`}
                      onClick={() => handlePaymentMethodSelect("upi")}
                    >
                      <div className="payment-icon">📱</div>
                      <div className="payment-info">
                        <h4>UPI Payment</h4>
                        <p>Pay instantly using UPI apps</p>
                      </div>
                      <div className="payment-arrow">→</div>
                    </div>

                    <div
                      className={`payment-option ${selectedPaymentMethod === "cod" ? "selected" : ""}`}
                      onClick={() => handlePaymentMethodSelect("cod")}
                    >
                      <div className="payment-icon">💵</div>
                      <div className="payment-info">
                        <h4>Cash on Delivery</h4>
                        <p>Pay when your order is delivered</p>
                      </div>
                      <div className="payment-arrow">→</div>
                    </div>
                  </div>
                </div>
              )}

              {paymentStep === "upi" && (
                <div className="upi-providers">
                  <div className="upi-amount">
                    <h4>Amount to Pay: ₹{orderTotal}</h4>
                  </div>

                  <div className="upi-options">
                    <h4>Choose your preferred UPI app:</h4>
                    <div className="upi-grid">
                      {upiProviders.map((provider) => (
                        <div
                          key={provider.id}
                          className="upi-option"
                          onClick={() => handleUpiProviderSelect(provider)}
                          style={{ borderColor: provider.color }}
                        >
                          <div className="upi-icon" style={{ color: provider.color }}>
                            {provider.icon}
                          </div>
                          <div className="upi-name">{provider.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="upi-back">
                    <button className="back-btn" onClick={() => setPaymentStep("method")}>
                      ← Back to Payment Methods
                    </button>
                  </div>
                </div>
              )}

              {paymentStep === "processing" && (
                <div className="payment-processing">
                  <div className="processing-animation">
                    <div className="spinner"></div>
                  </div>
                  <h4>Processing Payment...</h4>
                  <p>Please wait while we process your payment through {selectedUpiProvider}</p>
                  <div className="processing-details">
                    <div className="detail-row">
                      <span>Amount:</span>
                      <span>₹{orderTotal}</span>
                    </div>
                    <div className="detail-row">
                      <span>Payment Method:</span>
                      <span>{upiProviders.find((p) => p.id === selectedUpiProvider)?.name}</span>
                    </div>
                  </div>
                </div>
              )}

              {paymentStep === "success" && (
                <div className="payment-success">
                  <div className="success-animation">
                    <div className="success-icon">✅</div>
                  </div>
                  <h4>Payment Successful!</h4>
                  <p>Your order has been placed successfully</p>
                  <div className="success-details">
                    <div className="detail-row">
                      <span>Amount Paid:</span>
                      <span>₹{orderTotal}</span>
                    </div>
                    <div className="detail-row">
                      <span>Payment Method:</span>
                      <span>{upiProviders.find((p) => p.id === selectedUpiProvider)?.name}</span>
                    </div>
                    <div className="detail-row">
                      <span>Transaction ID:</span>
                      <span>TXN{Date.now()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {isChangingPassword && (
        <div className="popup-overlay">
          <div className="popup-content password-modal">
            <div className="password-header">
              <h3>Change Password</h3>
              <button className="close-btn" onClick={handleCancelPasswordChange}>
                ✕
              </button>
            </div>

            <div className="password-content">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <div className="password-actions">
                <button className="save-password-btn" onClick={handleSavePassword}>
                  💾 Save Password
                </button>
                <button className="cancel-password-btn" onClick={handleCancelPasswordChange}>
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && ratingOrder && (
        <div className="popup-overlay">
          <div className="popup-content rating-modal">
            <div className="rating-header">
              <h3>Rate Your Experience</h3>
              <button className="close-btn" onClick={() => setShowRatingModal(false)}>
                ✕
              </button>
            </div>

            <div className="rating-content">
              <div className="order-info">
                <p>
                  <strong>Order:</strong> #{ratingOrder.id}
                </p>
                <p>
                  <strong>Laundryman:</strong> {ratingOrder.laundryman}
                </p>
                <p>
                  <strong>Services:</strong>{" "}
                  {ratingOrder.services.map((serviceId) => services.find((s) => s.id === serviceId)?.name).join(", ")}
                </p>
              </div>

              <div className="star-rating">
                <p>How was your experience?</p>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`star ${star <= rating ? "active" : ""}`}
                      onClick={() => setRating(star)}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                <p className="rating-text">
                  {rating === 0 && "Select a rating"}
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              </div>

              <div className="feedback-section">
                <label htmlFor="feedback">Additional Feedback (Optional)</label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience..."
                  rows={4}
                />
              </div>

              <div className="rating-actions">
                <button className="submit-rating-btn" onClick={handleSubmitRating}>
                  Submit Rating
                </button>
                <button className="cancel-rating-btn" onClick={() => setShowRatingModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reorder Modal */}
      {showReorderModal && reorderData && (
        <div className="popup-overlay">
          <div className="popup-content reorder-modal">
            <div className="reorder-header">
              <h3>Reorder Confirmation</h3>
              <button className="close-btn" onClick={() => setShowReorderModal(false)}>
                ✕
              </button>
            </div>

            <div className="reorder-content">
              <div className="reorder-details">
                <h4>Previous Order Details</h4>
                <div className="detail-item">
                  <span>Order ID:</span>
                  <span>#{reorderData.id}</span>
                </div>
                <div className="detail-item">
                  <span>Services:</span>
                  <span>{reorderData.services?.map((s) => s.name).join(", ")}</span>
                </div>
                <div className="detail-item">
                  <span>Laundryman:</span>
                  <span>{reorderData.laundrymanName}</span>
                </div>
                <div className="detail-item">
                  <span>Total Amount:</span>
                  <span>₹{reorderData.total}</span>
                </div>
              </div>

              <div className="reorder-items">
                <h4>Items to Reorder</h4>
                <div className="items-list">
                  {reorderData.items.map((item, index) => (
                    <div key={index} className="item">
                      <span>
                        {item.name} x {item.quantity} {item.serviceName && `(${item.serviceName})`}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reorder-note">
                <p>📝 Note: You'll be able to modify the order details (date, time, etc.) on the booking page.</p>
              </div>

              <div className="reorder-actions">
                <button className="confirm-reorder-btn" onClick={confirmReorder}>
                  ✅ Proceed to Book
                </button>
                <button className="cancel-reorder-btn" onClick={() => setShowReorderModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Slot Modal */}
      {showTimeSlotModal && (
        <div className="popup-overlay">
          <div className="popup-content time-slot-modal">
            <div className="time-slot-header">
              <h3>Available Time Slots</h3>
              <button className="close-btn" onClick={() => setShowTimeSlotModal(false)}>
                ✕
              </button>
            </div>

            <div className="time-slot-content">
              <div className="date-selection">
                <label htmlFor="slotDate">Select Date:</label>
                <input
                  type="date"
                  id="slotDate"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={getMinDate()}
                  max={getMaxDate()}
                  className="date-input"
                />
              </div>

              <div className="time-slots-grid">
                {timeSlots.length === 0 ? (
                  <div className="no-slots">
                    <p>No time slots available for selected date</p>
                    <span>All slots have passed for today</span>
                  </div>
                ) : (
                  timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`time-slot ${slot.status} ${selectedTimeSlot?.id === slot.id ? "selected" : ""}`}
                      onClick={() => handleSelectTimeSlot(slot)}
                    >
                      <div className="slot-time">{slot.time}</div>
                      <div className="slot-availability">
                        {slot.status === "available" ? (
                          <>
                            <span className="available-icon">✅</span>
                            <span>
                              {slot.available}/{slot.total} available
                            </span>
                          </>
                        ) : slot.status === "full" ? (
                          <>
                            <span className="full-icon">❌</span>
                            <span>Slot Full</span>
                          </>
                        ) : (
                          <>
                            <span className="unavailable-icon">🚫</span>
                            <span>Unavailable</span>
                            {slot.reason && (
                              <div className="unavailable-reason">{slot.reason}</div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Popup */}
      {showOrderConfirmation && (
        <div className="popup-overlay">
          <div className="popup-content order-confirmation-popup">
            <div className="success-icon">✅</div>
            <h3>Thank You!</h3>
            <p>Your order has been confirmed successfully</p>
            <div className="order-details-popup">
              <p>
                <strong>Order ID:</strong> {orders[0]?.id}
              </p>
              <p>
                <strong>Expected Delivery:</strong> {getDeliveryTimeSlot(selectedDate)}
              </p>
            </div>
            <button className="close-popup-btn" onClick={() => setShowOrderConfirmation(false)}>
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="popup-overlay">
          <div className="popup-content logout-popup">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="popup-buttons">
              <button className="confirm-btn" onClick={confirmLogout}>
                Yes, Logout
              </button>
              <button className="cancel-btn" onClick={cancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Tracking Modal */}
      {showTrackingModal && trackingOrder && (
        <div className="popup-overlay">
          <div className="popup-content tracking-modal">
            <div className="tracking-header">
              <h3>Track Order #{trackingOrder.id}</h3>
              <button className="close-btn" onClick={() => setShowTrackingModal(false)}>
                ✕
              </button>
            </div>

            <div className="tracking-content">
              <div className="order-summary">
                <div className="summary-item">
                  <span>Laundryman:</span>
                  <span>{trackingOrder.laundryman}</span>
                </div>
                <div className="summary-item">
                  <span>Services:</span>
                  <span>
                    {trackingOrder.services
                      .map((serviceId) => services.find((s) => s.id === serviceId)?.name)
                      .join(", ")}
                  </span>
                </div>
                <div className="summary-item">
                  <span>Expected Delivery:</span>
                  <span className="delivery-time">{getDeliveryTimeSlot(trackingOrder.date)}</span>
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${getOrderProgress(trackingOrder.status)}%` }}></div>
                </div>
                <div className="progress-percentage">{getOrderProgress(trackingOrder.status)}% Complete</div>
              </div>

              <div className="status-timeline">
                <div
                  className={`timeline-item ${["Confirmed", "In Progress", "Ready for Pickup", "Delivered"].includes(trackingOrder.status) ? "completed" : ""}`}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>Order Confirmed</h4>
                    <p>Your order has been confirmed</p>
                    <span className="timeline-time">
                      {trackingOrder.status === "Confirmed" ? "Current" : "Completed"}
                    </span>
                  </div>
                </div>

                <div
                  className={`timeline-item ${["In Progress", "Ready for Pickup", "Delivered"].includes(trackingOrder.status) ? "completed" : ""}`}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>Clothes Picked Up</h4>
                    <p>Your clothes are being processed</p>
                    <span className="timeline-time">
                      {trackingOrder.status === "In Progress"
                        ? "Current"
                        : ["Ready for Pickup", "Delivered"].includes(trackingOrder.status)
                          ? "Completed"
                          : "Pending"}
                    </span>
                  </div>
                </div>

                <div
                  className={`timeline-item ${["Ready for Pickup", "Delivered"].includes(trackingOrder.status) ? "completed" : ""}`}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>Ready for Delivery</h4>
                    <p>Your clothes are clean and ready</p>
                    <span className="timeline-time">
                      {trackingOrder.status === "Ready for Pickup"
                        ? "Current"
                        : trackingOrder.status === "Delivered"
                          ? "Completed"
                          : "Pending"}
                    </span>
                  </div>
                </div>

                <div className={`timeline-item ${trackingOrder.status === "Delivered" ? "completed" : ""}`}>
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>Delivered</h4>
                    <p>Order completed successfully</p>
                    <span className="timeline-time">
                      {trackingOrder.status === "Delivered" ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="contact-section">
                <button className="contact-btn" onClick={() => handleContactLaundryman(trackingOrder)}>
                  📞 Contact Laundryman
                </button>
                <button className="support-btn" onClick={() => handleCustomerSupport(trackingOrder)}>
                  💬 Customer Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerDashboard