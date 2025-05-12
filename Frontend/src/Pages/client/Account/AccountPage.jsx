import { useState, useEffect } from 'react';
import { Bell, Calendar, CreditCard, Edit, Eye, EyeOff, Heart, LogOut, Map, Package, Save, ShoppingBag, Trash, User as UserIcon } from 'lucide-react';

export default function AccountPage() {
  // State management for user data
  const [userData, setUserData] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    avatar: '/api/placeholder/150/150',
    address: '123 Baker Street, Sweet City, CA 90210',
    paymentMethods: [
      { id: 1, type: 'Visa', lastFour: '4242', expiryDate: '12/26', isDefault: true },
      { id: 2, type: 'Mastercard', lastFour: '8888', expiryDate: '09/25', isDefault: false }
    ],
    orders: [
      { id: 'ORD-12345', date: '2025-04-29', status: 'Delivered', total: 42.99, items: ['Birthday Cake', 'Cupcakes (6)'] },
      { id: 'ORD-12346', date: '2025-04-15', status: 'Processing', total: 29.99, items: ['Chocolate Ganache Cake'] }
    ],
    favorites: [
      { id: 1, name: 'Red Velvet Cake', price: 32.99, image: '/api/placeholder/80/80' },
      { id: 2, name: 'Lemon Cheesecake', price: 28.99, image: '/api/placeholder/80/80' }
    ],
    notifications: {
      emailOffers: true,
      orderUpdates: true,
      newProducts: false
    }
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState('profile');

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Form state for profile editing
  const [formData, setFormData] = useState({ ...userData });

  // Password states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isEditing) {
      setIsEditing(false);
      setFormData({ ...userData });
    }
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle notifications toggle
  const handleNotificationToggle = (setting) => {
    setFormData({
      ...formData,
      notifications: {
        ...formData.notifications,
        [setting]: !formData.notifications[setting]
      }
    });
  };

  // Handle save profile changes
  const handleSaveChanges = () => {
    setUserData({ ...formData });
    setIsEditing(false);

    // Here you would typically make an API call to update the user profile
    // Example: await updateUserProfile(formData);

    // Show success message (toast notification)
    alert('Profile updated successfully!');
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  // Handle password update
  const handleUpdatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    // Here you would make an API call to update the password
    // Example: await updateUserPassword(passwordData);

    // Reset form and show success
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    alert('Password updated successfully!');
  };

  // Handle remove favorite
  const handleRemoveFavorite = (id) => {
    const updatedFavorites = userData.favorites.filter(item => item.id !== id);
    setUserData({
      ...userData,
      favorites: updatedFavorites
    });

    // Here you would make an API call to update favorites
    // Example: await removeFromFavorites(id);
  };

  // Handle remove payment method
  const handleRemovePayment = (id) => {
    const updatedPayments = userData.paymentMethods.filter(method => method.id !== id);
    setUserData({
      ...userData,
      paymentMethods: updatedPayments
    });

    // Here you would make an API call to remove payment method
    // Example: await removePaymentMethod(id);
  };

  // Handle set default payment method
  const handleSetDefaultPayment = (id) => {
    const updatedPayments = userData.paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }));

    setUserData({
      ...userData,
      paymentMethods: updatedPayments
    });

    // Here you would make an API call to update default payment
    // Example: await setDefaultPaymentMethod(id);
  };

  // Handle logout
  const handleLogout = () => {
    // Here you would clear auth tokens, cookies, etc.
    // Example: clearAuthTokens();
    alert('Logged out successfully!');
    // Redirect to home page
    // Example: window.location.href = "/";
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Header with decorative elements */}
      <div className="bg-primary-100 py-8 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl text-primary-800 font-heading">My Account</h1>
          <p className="text-primary-600 mt-2">Manage your profile and preferences</p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-200 rounded-full -mr-20 -mt-20 opacity-50"></div>
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-primary-200 rounded-full -mb-16 opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar navigation */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8">
              <div className="flex items-center gap-4 pb-6 border-b border-neutral-200">
                <img
                  src={userData.avatar}
                  alt={userData.fullName}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
                />
                <div>
                  <h2 className="font-heading text-xl text-neutral-800">{userData.fullName}</h2>
                  <p className="text-neutral-500 text-sm">{userData.email}</p>
                </div>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                <button
                  onClick={() => handleTabChange('profile')}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'profile'
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                >
                  <UserIcon size={18} />
                  <span>Profile Information</span>
                </button>

                <button
                  onClick={() => handleTabChange('orders')}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'orders'
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                >
                  <ShoppingBag size={18} />
                  <span>Order History</span>
                </button>

                <button
                  onClick={() => handleTabChange('favorites')}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'favorites'
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                >
                  <Heart size={18} />
                  <span>Favorite Items</span>
                </button>

                <button
                  onClick={() => handleTabChange('payments')}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'payments'
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                >
                  <CreditCard size={18} />
                  <span>Payment Methods</span>
                </button>

                <button
                  onClick={() => handleTabChange('notifications')}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'notifications'
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                >
                  <Bell size={18} />
                  <span>Notifications</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 p-3 rounded-lg text-error hover:bg-error/10 mt-6 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main content area */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Profile Information Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-heading text-2xl text-neutral-800">Profile Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 btn btn-sm btn-outline"
                      >
                        <Edit size={16} />
                        Edit Profile
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveChanges}
                        className="flex items-center gap-2 btn btn-sm btn-primary"
                      >
                        <Save size={16} />
                        Save Changes
                      </button>
                    )}
                  </div>

                  {!isEditing ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-neutral-500 text-sm mb-1">Full Name</h3>
                        <p className="text-neutral-800">{userData.fullName}</p>
                      </div>

                      <div>
                        <h3 className="text-neutral-500 text-sm mb-1">Email Address</h3>
                        <p className="text-neutral-800">{userData.email}</p>
                      </div>

                      <div>
                        <h3 className="text-neutral-500 text-sm mb-1">Phone Number</h3>
                        <p className="text-neutral-800">{userData.phoneNumber}</p>
                      </div>

                      <div>
                        <h3 className="text-neutral-500 text-sm mb-1">Delivery Address</h3>
                        <p className="text-neutral-800">{userData.address}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-neutral-500 text-sm mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="input"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-neutral-500 text-sm mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="input"
                        />
                      </div>

                      <div>
                        <label htmlFor="phoneNumber" className="block text-neutral-500 text-sm mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="input"
                        />
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-neutral-500 text-sm mb-1">
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="input"
                        />
                      </div>
                    </div>
                  )}

                  {/* Password Change Section */}
                  <div className="mt-10 pt-6 border-t border-neutral-200">
                    <h3 className="font-heading text-xl text-neutral-800 mb-4">Change Password</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="currentPassword" className="block text-neutral-500 text-sm mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="input pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="newPassword" className="block text-neutral-500 text-sm mb-1">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              id="newPassword"
                              name="newPassword"
                              value={passwordData.newPassword}
                              onChange={handlePasswordChange}
                              className="input pr-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-neutral-500 text-sm mb-1">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              id="confirmPassword"
                              name="confirmPassword"
                              value={passwordData.confirmPassword}
                              onChange={handlePasswordChange}
                              className="input pr-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={handleUpdatePassword}
                          className="btn btn-secondary"
                          disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                        >
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-heading text-2xl text-neutral-800">Order History</h2>
                  </div>

                  {userData.orders.length > 0 ? (
                    <div className="space-y-6">
                      {userData.orders.map(order => (
                        <div key={order.id} className="border border-neutral-200 rounded-lg p-4 transition-all hover:border-primary-300 hover:shadow-md">
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                            <div>
                              <span className="text-sm text-neutral-500">Order ID:</span>
                              <h3 className="font-medium text-lg">{order.id}</h3>
                            </div>

                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-neutral-400" />
                              <span className="text-sm text-neutral-600">{new Date(order.date).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap justify-between items-center gap-4 mb-3">
                            <div>
                              <span className="text-sm text-neutral-500">Items:</span>
                              <p className="text-neutral-800">{order.items.join(', ')}</p>
                            </div>

                            <div className="text-right">
                              <span className="text-sm text-neutral-500">Total:</span>
                              <p className="text-lg font-medium text-neutral-800">${order.total.toFixed(2)}</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <span className={`badge ${order.status === 'Delivered' ? 'badge-secondary' :
                                order.status === 'Processing' ? 'badge-primary' :
                                  'bg-neutral-100 text-neutral-600'
                                }`}>
                                {order.status}
                              </span>
                            </div>

                            <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package size={48} className="mx-auto text-neutral-300 mb-4" />
                      <h3 className="text-xl font-heading text-neutral-600 mb-2">No orders yet</h3>
                      <p className="text-neutral-500 mb-6">You haven't placed any orders yet.</p>
                      <button className="btn btn-primary">Browse Our Cakes</button>
                    </div>
                  )}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-heading text-2xl text-neutral-800">Favorite Items</h2>
                  </div>

                  {userData.favorites.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {userData.favorites.map(item => (
                        <div key={item.id} className="flex border border-neutral-200 rounded-lg overflow-hidden transition-all hover:border-primary-300 hover:shadow-md">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover"
                          />
                          <div className="flex-1 p-3 flex justify-between items-center">
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-primary-600 font-medium">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="btn btn-sm btn-secondary">
                                Add to Cart
                              </button>
                              <button
                                onClick={() => handleRemoveFavorite(item.id)}
                                className="p-2 text-neutral-400 hover:text-error rounded-full hover:bg-neutral-100"
                              >
                                <Trash size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart size={48} className="mx-auto text-neutral-300 mb-4" />
                      <h3 className="text-xl font-heading text-neutral-600 mb-2">No favorites yet</h3>
                      <p className="text-neutral-500 mb-6">You haven't added any items to your favorites yet.</p>
                      <button className="btn btn-primary">Browse Our Selection</button>
                    </div>
                  )}
                </div>
              )}

              {/* Payment Methods Tab */}
              {activeTab === 'payments' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-heading text-2xl text-neutral-800">Payment Methods</h2>
                    <button className="btn btn-sm btn-outline">
                      Add New Payment
                    </button>
                  </div>

                  {userData.paymentMethods.length > 0 ? (
                    <div className="space-y-4">
                      {userData.paymentMethods.map(method => (
                        <div key={method.id} className="border border-neutral-200 rounded-lg p-4 transition-all hover:border-primary-300 hover:shadow-md">
                          <div className="flex justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-8 rounded flex items-center justify-center ${method.type === 'Visa' ? 'bg-blue-100 text-blue-700' :
                                method.type === 'Mastercard' ? 'bg-red-100 text-red-700' :
                                  'bg-neutral-100'
                                }`}>
                                <span className="font-medium text-sm">{method.type}</span>
                              </div>
                              <div>
                                <p className="font-medium">•••• {method.lastFour}</p>
                                <p className="text-sm text-neutral-500">Expires {method.expiryDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {method.isDefault ? (
                                <span className="badge badge-secondary">Default</span>
                              ) : (
                                <button
                                  onClick={() => handleSetDefaultPayment(method.id)}
                                  className="text-sm text-primary-600 hover:text-primary-800"
                                >
                                  Set as Default
                                </button>
                              )}
                              <button
                                onClick={() => handleRemovePayment(method.id)}
                                className="p-2 text-neutral-400 hover:text-error rounded-full hover:bg-neutral-100"
                                disabled={method.isDefault}
                              >
                                <Trash size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CreditCard size={48} className="mx-auto text-neutral-300 mb-4" />
                      <h3 className="text-xl font-heading text-neutral-600 mb-2">No payment methods</h3>
                      <p className="text-neutral-500 mb-6">You haven't added any payment methods yet.</p>
                      <button className="btn btn-primary">Add Payment Method</button>
                    </div>
                  )}
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-heading text-2xl text-neutral-800">Notification Preferences</h2>
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h3 className="font-medium">Email Offers & Discounts</h3>
                        <p className="text-sm text-neutral-500">Receive special offers and promotional discounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.notifications.emailOffers}
                          onChange={() => handleNotificationToggle('emailOffers')}
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>

                    <div className="flex justify-between items-center p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h3 className="font-medium">Order Status Updates</h3>
                        <p className="text-sm text-neutral-500">Get notified about your order status changes</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.notifications.orderUpdates}
                          onChange={() => handleNotificationToggle('orderUpdates')}
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>

                    <div className="flex justify-between items-center p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h3 className="font-medium">New Product Announcements</h3>
                        <p className="text-sm text-neutral-500">Stay updated with our latest cake creations</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={formData.notifications.newProducts}
                          onChange={() => handleNotificationToggle('newProducts')}
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                      </label>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={handleSaveChanges}
                        className="btn btn-primary"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
