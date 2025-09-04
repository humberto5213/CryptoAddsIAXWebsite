/**
 * IAX Website - Main TypeScript Application
 * Interactive landing page for the Intelligent Advertising Platform
 */

// Types
interface ScrollAnimationConfig {
  threshold: number;
  rootMargin: string;
}

interface ModalConfig {
  backdrop: boolean;
  keyboard: boolean;
  focus: boolean;
}

// App Configuration
const CONFIG = {
  scrollAnimation: {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  } as ScrollAnimationConfig,
  
  modal: {
    backdrop: true,
    keyboard: true,
    focus: true
  } as ModalConfig,
  
  endpoints: {
    register: '/auth/register',
    login: '/auth/login',
    contact: '/contact'
  }
};

// Main Application Class
class IAXWebsite {
  private scrollObserver: IntersectionObserver | null = null;
  private navbar: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  /**
   * Initialize the application
   */
  private init(): void {
    this.setupEventListeners();
    this.setupScrollAnimations();
    this.setupNavbar();
    this.setupSmoothScrolling();
    console.log('🚀 IAX Website initialized successfully!');
  }

  /**
   * Setup event listeners for interactive elements
   */
  private setupEventListeners(): void {
    // Registration buttons
    this.addClickListener('#startEarningBtn', () => this.handleRegistration('client'));
    this.addClickListener('#promoteBtn', () => this.handleRegistration('provider'));
    this.addClickListener('#earnPlatformBtn', () => this.handleRegistration('client'));
    this.addClickListener('#promotePlatformBtn', () => this.handleRegistration('provider'));
    this.addClickListener('#joinClientBtn', () => this.handleRegistration('client'));
    this.addClickListener('#joinProviderBtn', () => this.handleRegistration('provider'));

    // Navigation buttons
    this.addClickListener('#loginBtn', () => this.handleLogin());
    this.addClickListener('#registerBtn', () => this.showRegistrationModal());
    this.addClickListener('#signInLink', () => this.handleLogin());

    // WhatsApp button analytics
    this.setupWhatsAppTracking();
    
    // Contact section analytics
    this.setupContactTracking();

    // Video placeholder interaction
    this.setupVideoPlaceholder();
  }

  /**
   * Add click event listener to element
   */
  private addClickListener(selector: string, handler: () => void): void {
    const element = document.querySelector(selector);
    if (element) {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        handler();
      });
    }
  }

  /**
   * Handle user registration with role selection
   */
  private handleRegistration(role: 'client' | 'provider'): void {
    const action = role === 'client' ? 'earning IAX tokens' : 'promoting your brand';
    
    this.showNotification(
      `Ready to start ${action}?`,
      `You\'ll be redirected to create your ${role} account.`,
      'info'
    );

    // Simulate navigation (in real app, this would redirect to registration)
    setTimeout(() => {
      console.log(`Registering as ${role}...`);
      // window.location.href = `${CONFIG.endpoints.register}?role=${role}`;
    }, 2000);
  }

  /**
   * Handle user login
   */
  private handleLogin(): void {
    this.showNotification(
      'Welcome back!',
      'You\'ll be redirected to the login page.',
      'info'
    );

    setTimeout(() => {
      console.log('Redirecting to login...');
      // window.location.href = CONFIG.endpoints.login;
    }, 2000);
  }

  /**
   * Show registration modal for role selection
   */
  private showRegistrationModal(): void {
    const modal = this.createRegistrationModal();
    document.body.appendChild(modal);
    
    // Show modal with Bootstrap
    const bsModal = new (window as any).bootstrap.Modal(modal);
    bsModal.show();

    // Clean up modal when hidden
    modal.addEventListener('hidden.bs.modal', () => {
      document.body.removeChild(modal);
    });
  }

  /**
   * Create registration modal
   */
  private createRegistrationModal(): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.setAttribute('tabindex', '-1');
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="border-radius: 1rem; border: none; overflow: hidden;">
          <div class="modal-header" style="background: linear-gradient(135deg, #0ea5e9, #14b8a6); color: white; border: none;">
            <h5 class="modal-title">
              <i class="fas fa-coins me-2"></i>
              Join the IAX Ecosystem
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body p-4">
            <p class="text-center mb-4" style="color: #64748b;">
              Choose how you'd like to participate in the intelligent advertising revolution:
            </p>
            <div class="row g-3">
              <div class="col-md-6">
                <button class="btn w-100 p-3 role-btn" data-role="client" style="background: linear-gradient(135deg, #0ea5e9, #14b8a6); color: white; border-radius: 0.75rem; border: none;">
                  <i class="fas fa-coins fa-2x mb-2 d-block"></i>
                  <strong>Earn IAX</strong>
                  <br>
                  <small>Watch relevant ads & get paid</small>
                </button>
              </div>
              <div class="col-md-6">
                <button class="btn w-100 p-3 role-btn" data-role="provider" style="background: linear-gradient(135deg, #7c3aed, #f59e0b); color: white; border-radius: 0.75rem; border: none;">
                  <i class="fas fa-rocket fa-2x mb-2 d-block"></i>
                  <strong>Promote Ads</strong>
                  <br>
                  <small>Reach willing audiences</small>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add click handlers for role buttons
    modal.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const roleBtn = target.closest('.role-btn') as HTMLElement;
      if (roleBtn) {
        const role = roleBtn.getAttribute('data-role') as 'client' | 'provider';
        const bsModal = (window as any).bootstrap.Modal.getInstance(modal);
        bsModal.hide();
        this.handleRegistration(role);
      }
    });

    return modal;
  }

  /**
   * Setup WhatsApp button tracking
   */
  private setupWhatsAppTracking(): void {
    const whatsappBtn = document.querySelector('#whatsappBtn a');
    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        // Track WhatsApp click with Vercel Analytics
        if (typeof (window as any).va === 'function') {
          (window as any).va('event', { name: 'whatsapp_click' });
        }
        
        console.log('📱 WhatsApp button clicked');
      });
    }
  }

  /**
   * Setup contact section tracking
   */
  private setupContactTracking(): void {
    // Track email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(emailLink => {
      emailLink.addEventListener('click', () => {
        if (typeof (window as any).va === 'function') {
          (window as any).va('event', { name: 'email_click' });
        }
        console.log('📧 Email link clicked');
      });
    });

    // Track phone clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
      phoneLink.addEventListener('click', () => {
        if (typeof (window as any).va === 'function') {
          (window as any).va('event', { name: 'phone_click' });
        }
        console.log('📞 Phone link clicked');
      });
    });
  }

  /**
   * Setup video placeholder interaction
   */
  private setupVideoPlaceholder(): void {
    const video = document.getElementById('promoVideo') as HTMLVideoElement | null;
    if (!video) return;

    // Configure for maximum autoplay compatibility
    video.muted = true;
    video.autoplay = true;
    (video as any).playsInline = true;
    video.loop = true;
    video.volume = 0;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('loop', '');

    // Ensure source is loaded early
    if (video.preload !== 'auto') {
      video.preload = 'auto';
    }
    const source = video.querySelector('source') as HTMLSourceElement | null;
    if (source && !source.src) {
      source.src = './promotional_videos_muted.mp4';
      try { video.load(); } catch {}
    }

    const tryPlayOnce = async (): Promise<boolean> => {
      if (!video.paused) return true;
      try {
        await video.play();
        return true;
      } catch {
        return false;
      }
    };

    const tryPlayWithRetries = async (attempts = 12): Promise<void> => {
      for (let i = 0; i < attempts; i += 1) {
        const ok = await tryPlayOnce();
        if (ok) return;
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    };

    // Play when visible enough in viewport
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio >= 0.15) {
          tryPlayWithRetries(8);
        }
      });
    }, { threshold: [0, 0.15, 0.25], rootMargin: '0px 0px -40px 0px' });
    io.observe(video);

    // Play as soon as it can
    const onReady = () => { void tryPlayWithRetries(5); };
    video.addEventListener('loadedmetadata', onReady, { once: true });
    video.addEventListener('loadeddata', onReady, { once: true });
    video.addEventListener('canplay', onReady);

    // If tab becomes visible again
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        void tryPlayWithRetries(3);
      }
    });

    // Fallback: first interaction
    const onInteraction = () => { void tryPlayWithRetries(3); };
    document.addEventListener('scroll', onInteraction, { once: true });
    document.addEventListener('click', onInteraction, { once: true });
    document.addEventListener('touchstart', onInteraction, { once: true });

    // Initial attempt
    void tryPlayWithRetries(3);
  }

  /**
   * Setup scroll animations
   */
  private setupScrollAnimations(): void {
    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      CONFIG.scrollAnimation
    );

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      '.flow-step, .platform-card, .feature-item, .feature-highlight'
    );
    
    animatedElements.forEach((el) => {
      this.scrollObserver?.observe(el);
      el.classList.add('animate-ready');
    });

    // Add CSS for animations
    this.addScrollAnimationStyles();
  }

  /**
   * Add CSS for scroll animations
   */
  private addScrollAnimationStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .animate-ready {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
      }
      
      .animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      .flow-step.animate-ready {
        transform: translateY(30px) scale(0.95);
      }
      
      .flow-step.animate-in {
        transform: translateY(0) scale(1);
      }
      
      .platform-card.animate-ready {
        transform: translateY(40px) rotateX(10deg);
      }
      
      .platform-card.animate-in {
        transform: translateY(0) rotateX(0);
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Setup navbar behavior
   */
  private setupNavbar(): void {
    this.navbar = document.querySelector('.navbar');
    if (!this.navbar) return;

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (this.navbar) {
        if (currentScrollY > 100) {
          this.navbar.style.background = 'rgba(255,255,255,0.95)';
          this.navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
        } else {
          this.navbar.style.background = 'rgba(255,255,255,0.9)';
          this.navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }

        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          this.navbar.style.transform = 'translateY(-100%)';
        } else {
          this.navbar.style.transform = 'translateY(0)';
        }
      }

      lastScrollY = currentScrollY;
    });
  }

  /**
   * Setup smooth scrolling for navigation links
   */
  private setupSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = (target as HTMLElement).offsetTop - 80; // Account for navbar
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  /**
   * Show notification to user
   */
  private showNotification(title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info'): void {
    const colors = {
      success: '#10b981',
      info: '#3b82f6',
      warning: '#f59e0b',
      error: '#ef4444'
    };

    const notification = document.createElement('div');
    notification.className = 'position-fixed';
    notification.style.cssText = `
      top: 100px;
      right: 20px;
      z-index: 1060;
      background: white;
      border-radius: 1rem;
      padding: 1.5rem;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      border-left: 4px solid ${colors[type]};
      max-width: 350px;
      transform: translateX(400px);
      transition: all 0.3s ease;
    `;

    notification.innerHTML = `
      <div class="d-flex align-items-start">
        <div class="me-3">
          <i class="fas ${this.getNotificationIcon(type)}" style="color: ${colors[type]}; font-size: 1.2rem;"></i>
        </div>
        <div class="flex-grow-1">
          <h6 class="mb-1" style="color: #1e293b; font-weight: 600;">${title}</h6>
          <p class="mb-0 small" style="color: #64748b;">${message}</p>
        </div>
        <button class="btn-close ms-2" style="font-size: 0.75rem;"></button>
      </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Setup close button
    const closeBtn = notification.querySelector('.btn-close');
    const closeNotification = () => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    };

    closeBtn?.addEventListener('click', closeNotification);

    // Auto close after 5 seconds
    setTimeout(closeNotification, 5000);
  }

  /**
   * Get notification icon based on type
   */
  private getNotificationIcon(type: string): string {
    const icons = {
      success: 'fa-check-circle',
      info: 'fa-info-circle',
      warning: 'fa-exclamation-triangle',
      error: 'fa-times-circle'
    };
    return icons[type as keyof typeof icons] || icons.info;
  }
}

// Enhanced scroll effects
class ScrollEffects {
  static addParallaxEffect(): void {
    const parallaxElements = document.querySelectorAll('.hero-section::before');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      parallaxElements.forEach((element) => {
        (element as HTMLElement).style.transform = `translateY(${rate}px)`;
      });
    });
  }

  static addHoverEffects(): void {
    // Enhanced platform card hover effects
    document.querySelectorAll('.platform-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.classList.add('hover-active');
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('hover-active');
      });
    });
  }
}

// Utility functions
const Utils = {
  /**
   * Debounce function calls
   */
  debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  /**
   * Check if element is in viewport
   */
  isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Generate random ID
   */
  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
};

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new IAXWebsite();
  ScrollEffects.addParallaxEffect();
  ScrollEffects.addHoverEffects();
});

// Add additional hover effects CSS
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  .platform-card.hover-active {
    transform: translateY(-8px) scale(1.02) !important;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2) !important;
  }
  
  .platform-card.hover-active .platform-icon {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
  
  .cta-btn {
    position: relative;
    overflow: hidden;
  }
  
  .cta-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  .cta-btn:hover::before {
    left: 100%;
  }
  
  .navbar {
    transition: all 0.3s ease;
  }
  
  .video-placeholder {
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .video-placeholder:hover {
    transform: scale(1.05);
  }
  
  .video-placeholder:hover i {
    color: #14b8a6 !important;
  }
`;

document.head.appendChild(additionalStyles);

// Export for potential module usage
export { IAXWebsite, ScrollEffects, Utils };
