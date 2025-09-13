// Auth Debug Utility
// This utility helps debug authentication issues

export const checkAuthState = () => {
  const authState = localStorage.getItem('authState');
  if (!authState) {
    console.log('❌ No auth state found in localStorage');
    return false;
  }

  try {
    const parsed = JSON.parse(authState);
    if (!parsed.user || !parsed.user._id) {
      console.log('❌ Invalid auth state: missing user or user._id');
      return false;
    }

    if (parsed.user._id.length !== 24) {
      console.log('❌ Invalid user ID length:', parsed.user._id.length, 'Expected: 24');
      console.log('❌ User ID:', parsed.user._id);
      return false;
    }

    console.log('✅ Valid auth state found');
    console.log('✅ User ID:', parsed.user._id);
    console.log('✅ User name:', parsed.user.name);
    console.log('✅ User role:', parsed.user.role);
    return true;
  } catch (error) {
    console.log('❌ Error parsing auth state:', error);
    return false;
  }
};

export const clearInvalidAuthState = () => {
  console.log('🧹 Clearing invalid auth state...');
  localStorage.removeItem('authState');
  console.log('✅ Auth state cleared. Please refresh the page and login again.');
};

export const getValidTestCredentials = () => {
  return {
    patient: {
      email: 'test.patient@example.com',
      password: 'password123'
    },
    doctor: {
      email: 'sarah.johnson@example.com',
      password: 'password123'
    }
  };
};

// Add to window for easy access in browser console
if (typeof window !== 'undefined') {
  (window as any).authDebug = {
    check: checkAuthState,
    clear: clearInvalidAuthState,
    testCredentials: getValidTestCredentials
  };
}
