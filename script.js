/* ==========================================
   JavaScript - Mhamad Adil Portfolio
   ========================================== */
window.addEventListener('load', () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.classList.add("is-hidden");
        setTimeout(() => {
            loader.remove(); 
        }, 500);
    }
});
setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.remove();
    }
}, 2000);

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  const savedTheme = localStorage.getItem("mhamad-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  const updateThemeIcon = () => {
    if (!themeIcon) return;
    const isLight = document.body.classList.contains("light-mode");
    themeIcon.classList.toggle("fa-sun", isLight);
    themeIcon.classList.toggle("fa-moon", !isLight);
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", isLight ? "تفعيل المظهر الداكن" : "تفعيل المظهر الفاتح");
      themeToggle.title = isLight ? "تفعيل المظهر الداكن" : "تفعيل المظهر الفاتح";
    }
  };

  updateThemeIcon();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const theme = document.body.classList.contains("light-mode") ? "light" : "dark";
      try {
        localStorage.setItem("mhamad-theme", theme);
      } catch (error) {}
      updateThemeIcon();
    });
  }

  document.querySelectorAll(".back-to-top").forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = link.getAttribute("href");
      if (target === "#top" || target === "#") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  document.querySelectorAll(".hero-profile-pic").forEach((image) => {
    image.addEventListener("error", () => {
      console.warn("صورة الملف الشخصي غير موجودة.");
      image.classList.add("image-not-found");
    }, { once: true });
  });

  const checkAdminAuth = () => {
    const token = localStorage.getItem('adminToken');
    const loginFormContainer = document.getElementById('login-form'); 
    
    if (token) {
      if (loginFormContainer) {
        loginFormContainer.innerHTML = `
          <div class="admin-welcome-box" style="text-align: center; padding: 20px;">
            <h3>أهلاً بك يا أدمن 🚀</h3>
            <p style="color: #4ade80; margin: 10px 0;">لديك صلاحيات كاملة لتعديل الملف الشخصي.</p>
            <button id="logout-btn" class="btn-submit" style="background-color: #ef4444; margin-top: 10px; cursor: pointer;">
              تسجيل الخروج <i class="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        `;
        
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('adminToken');
            alert("تم تسجيل الخروج بنجاح.");
            window.location.reload();
          });
        }
      }
      document.querySelectorAll('.admin-only-edit').forEach(el => {
        el.style.display = 'block'; 
      });
    }
  };

  checkAdminAuth();
});

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault(); 

        const emailInput = document.getElementById('login-username').value;
        const passwordInput = document.getElementById('login-password').value;

        try {
            const response = await fetch('http://localhost:3002/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput,
                    password: passwordInput
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("تم تسجيل الدخول بنجاح:", data.message);
                localStorage.setItem('adminToken', data.token);
                alert("أهلاً بك يا أدمن، تم تسجيل الدخول بنجاح! 🚀");
                window.location.reload();
            } else {
                alert(data.message || "فشل تسجيل الدخول، تأكد من البيانات.");
            }
        } catch (error) {
            console.error("مشكلة في الاتصال:", error);
            alert("تعذر الاتصال بالسيرفر، تأكد أنه شغال على البورت 3002!");
        }
    });
}