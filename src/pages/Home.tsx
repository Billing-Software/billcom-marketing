import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Receipt, 
  Users, 
  Send, 
  Activity, 
  AlertTriangle,
  Plus, 
  Minus, 
  RefreshCw, 
  ShoppingBag, 
  Store, 
  DollarSign, 
  Printer, 
  FileText, 
  Truck, 
  MapPin, 
  Scissors, 
  Trash2, 
  Percent, 
  Settings, 
  LayoutDashboard, 
  Boxes, 
  SquareUser, 
  Wallet,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Database,
  Star
} from 'lucide-react';

interface CatalogItem {
  id: string;
  name: string;
  price: number;
  category: string;
  icon: string;
  duration?: number;
  sku: string;
}

interface MockBill {
  id: string;
  billNumber: string;
  customerName: string;
  customerPhone: string;
  items: { name: string; price: number; qty: number }[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
  status: 'Paid';
}

interface MockCustomer {
  id: string;
  name: string;
  phone: string;
  visits: number;
  totalSpent: number;
  isWalkIn: boolean;
}

interface MockExpense {
  id: string;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
}

interface MockStaffMember {
  id: string;
  name: string;
  empCode: string;
  contact: string;
  role: 'Manager' | 'Specialist' | 'Technician' | 'Cashier';
  status: 'Active' | 'Inactive';
}

interface MockInventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  reorderLevel: number;
  unit: string;
}

export default function Home() {
  const { pathname, hash } = useLocation();

  // Scroll anchor hook
  useEffect(() => {
    let targetId = hash.replace('#', '');
    if (!targetId) {
      if (pathname === '/features') targetId = 'features';
      else if (pathname === '/pricing') targetId = 'pricing';
      else if (pathname === '/demo') targetId = 'demo';
    }

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [hash, pathname]);

  // FEATURES SECTION STATES
  const [replenishStock, setReplenishStock] = useState<number>(6);
  const [restockingState, setRestockingState] = useState<'normal' | 'low' | 'ordered' | 'full'>('normal');

  useEffect(() => {
    const interval = setInterval(() => {
      setReplenishStock(prev => {
        if (prev <= 2) {
          setRestockingState('low');
          setTimeout(() => {
            setRestockingState('ordered');
            setTimeout(() => {
              setReplenishStock(50);
              setRestockingState('full');
              setTimeout(() => {
                setRestockingState('normal');
              }, 2000);
            }, 2000);
          }, 2000);
          return prev;
        } else if (restockingState === 'ordered' || restockingState === 'full') {
          return prev;
        } else {
          return prev - 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [restockingState]);

  // INTERACTIVE DEMO (POS) STATES
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pos' | 'invoices' | 'services' | 'inventory' | 'crm' | 'expenses' | 'staff' | 'settings'>('dashboard');
  const [industryFilter, setIndustryFilter] = useState<'All' | 'Tiffin & Cafe' | 'Salon & Spa' | 'Supermarket'>('All');
  const [businessName, setBusinessName] = useState<string>('Gachibowli HQ Terminal');
  const [taxRate, setTaxRate] = useState<number>(18);
  const [receiptFooter, setReceiptFooter] = useState<string>('Thank you for choosing BillCom!');

  const [services, setServices] = useState<CatalogItem[]>([
    { id: '1', name: 'Butter Masala Dosa Plate', price: 120, category: 'Tiffin & Cafe', icon: '🥞', duration: 10, sku: 'TF-DOSA-01' },
    { id: '2', name: 'Premium Haircut & Styling', price: 800, category: 'Salon & Spa', icon: '💇‍♂️', duration: 30, sku: 'SL-HAIR-02' },
    { id: '3', name: 'Basmati Rice (Premium 5kg)', price: 450, category: 'Supermarket', icon: '🌾', duration: 1, sku: 'SM-RICE-03' },
    { id: '4', name: 'Fresh Hot Filter Coffee', price: 30, category: 'Tiffin & Cafe', icon: '☕', duration: 5, sku: 'TF-COFF-04' },
    { id: '5', name: 'Organic Cooking Oil 1L', price: 210, category: 'Supermarket', icon: '🍾', duration: 1, sku: 'SM-OILL-05' },
    { id: '6', name: 'Hydrating face Gold Facial', price: 1500, category: 'Salon & Spa', icon: '💆‍♀️', duration: 45, sku: 'SL-FACI-06' },
  ]);

  const [inventory, setInventory] = useState<MockInventoryItem[]>([
    { id: 'i1', name: 'Premium Basmati Rice 5kg', sku: 'INV-RICE-01', stock: 12, reorderLevel: 5, unit: 'bags' },
    { id: 'i2', name: 'Pure Filter Coffee Powder', sku: 'INV-COFF-02', stock: 4, reorderLevel: 10, unit: 'pkts' },
    { id: 'i3', name: 'Organic Hair Serum Gold', sku: 'INV-SERM-03', stock: 2, reorderLevel: 5, unit: 'pcs' },
  ]);

  const [customers, setCustomers] = useState<MockCustomer[]>([
    { id: 'c1', name: 'Walk-In Customer', phone: 'N/A', visits: 42, totalSpent: 24500, isWalkIn: true },
    { id: 'c2', name: 'Rakesh Yadav', phone: '9848022338', visits: 8, totalSpent: 14200, isWalkIn: false },
    { id: 'c3', name: 'Anjali Sharma', phone: '8123456789', visits: 5, totalSpent: 9600, isWalkIn: false },
    { id: 'c4', name: 'Ravi Kumar', phone: '9000123456', visits: 3, totalSpent: 5400, isWalkIn: false },
  ]);

  const [bills, setBills] = useState<MockBill[]>([
    {
      id: 'b1',
      billNumber: 'INV-8924',
      customerName: 'Anjali Sharma',
      customerPhone: '8123456789',
      items: [{ name: 'Butter Masala Dosa Plate', price: 120, qty: 2 }, { name: 'Fresh Hot Filter Coffee', price: 30, qty: 2 }],
      subtotal: 300,
      discountAmount: 30,
      taxAmount: 48.6,
      totalAmount: 318.6,
      paymentMethod: 'UPI',
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      status: 'Paid'
    },
    {
      id: 'b2',
      billNumber: 'INV-8923',
      customerName: 'Rakesh Yadav',
      customerPhone: '9848022338',
      items: [{ name: 'Basmati Rice (Premium 5kg)', price: 450, qty: 1 }, { name: 'Organic Cooking Oil 1L', price: 210, qty: 2 }],
      subtotal: 870,
      discountAmount: 87,
      taxAmount: 39.15,
      totalAmount: 822.15,
      paymentMethod: 'Card',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      status: 'Paid'
    }
  ]);

  const [expenses, setExpenses] = useState<MockExpense[]>([
    { id: 'e1', title: 'Store Coffee Pantry Restock', amount: 1200, category: 'Pantry', createdAt: new Date(Date.now() - 3600000 * 24).toISOString() },
    { id: 'e2', title: 'Laundry Services (Towels)', amount: 3500, category: 'Maintenance', createdAt: new Date(Date.now() - 3600000 * 48).toISOString() }
  ]);

  const [staff, setStaff] = useState<MockStaffMember[]>([
    { id: 's1', name: 'Ravi Kumar', empCode: 'SB-102', contact: '9000123456', role: 'Cashier', status: 'Active' },
    { id: 's2', name: 'Anjali Sharma', empCode: 'SB-101', contact: '8123456789', role: 'Manager', status: 'Active' },
    { id: 's3', name: 'David Miller', empCode: 'SB-105', contact: '9876543210', role: 'Specialist', status: 'Active' },
  ]);

  const [revenueTotal, setRevenueTotal] = useState<number>(148500);
  const [billsCount, setBillsCount] = useState<number>(98);

  const [chartData, setChartData] = useState([
    { day: 'Mon', revenue: 15400 },
    { day: 'Tue', revenue: 18900 },
    { day: 'Wed', revenue: 12600 },
    { day: 'Thu', revenue: 21500 },
    { day: 'Fri', revenue: 24800 },
    { day: 'Sat', revenue: 32000 },
    { day: 'Sun', revenue: 23300 }
  ]);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const [cart, setCart] = useState<{ item: CatalogItem; qty: number }[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('c1');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [webhookStatus, setWebhookStatus] = useState<'idle' | 'sending' | 'delivered'>('idle');
  const [latestPrintedBill, setLatestPrintedBill] = useState<MockBill | null>(null);

  const [discountCode, setDiscountCode] = useState<string>('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(10);
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string>('VIP10');
  const [paymentMethod, setPaymentMethod] = useState<'Cash' | 'UPI' | 'Card'>('UPI');

  const [selectedInvoiceForModal, setSelectedInvoiceForModal] = useState<MockBill | null>(null);

  // Dialog toggles
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');

  const [isAddingService, setIsAddingService] = useState(false);
  const [newServName, setNewServName] = useState('');
  const [newServPrice, setNewServPrice] = useState('');
  const [newServCategory, setNewServCategory] = useState('Tiffin & Cafe');
  const [newServDuration, setNewServDuration] = useState('45');
  const [newServSku, setNewServSku] = useState('');

  const [isAddingInventory, setIsAddingInventory] = useState(false);
  const [newInvName, setNewInvName] = useState('');
  const [newInvStock, setNewInvStock] = useState('');
  const [newInvReorder, setNewInvReorder] = useState('');
  const [newInvSku, setNewInvSku] = useState('');

  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [newExpTitle, setNewExpTitle] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpCategory, setNewExpCategory] = useState('Pantry');

  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffCode, setNewStaffCode] = useState('');
  const [newStaffPhone, setNewStaffPhone] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<'Manager' | 'Specialist' | 'Technician' | 'Cashier'>('Specialist');

  const lowStockCount = inventory.filter(i => i.stock <= i.reorderLevel).length;

  const addToCart = (item: CatalogItem) => {
    setCart(prev => {
      const existing = prev.find(p => p.item.id === item.id);
      if (existing) {
        return prev.map(p => p.item.id === item.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { item, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.item.id === id) {
        const newQty = p.qty + delta;
        return newQty > 0 ? { ...p, qty: p.qty + delta } : p;
      }
      return p;
    }).filter(p => p.qty > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(p => p.item.id !== id));
  };

  const getSubtotal = () => cart.reduce((sum, p) => sum + (p.item.price * p.qty), 0);
  const getDiscount = () => Math.round(getSubtotal() * (appliedDiscountPercent / 100));
  const getGST = () => Math.round((getSubtotal() - getDiscount()) * (taxRate / 100));
  const getTotal = () => getSubtotal() + getGST() - getDiscount();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.toUpperCase() === 'VIP10') {
      setAppliedDiscountCode('VIP10');
      setAppliedDiscountPercent(10);
      setDiscountCode('');
    } else if (discountCode.endsWith('%')) {
      const parsedVal = parseInt(discountCode.replace('%', ''));
      if (!isNaN(parsedVal) && parsedVal >= 0 && parsedVal <= 100) {
        setAppliedDiscountCode(`CUSTOM-${parsedVal}%`);
        setAppliedDiscountPercent(parsedVal);
        setDiscountCode('');
      }
    } else {
      setAppliedDiscountCode('CUSTOM');
      setAppliedDiscountPercent(5);
      setDiscountCode('');
    }
  };

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newCustPhone) return;

    const newCust: MockCustomer = {
      id: `c-${Date.now()}`,
      name: newCustName,
      phone: newCustPhone,
      visits: 1,
      totalSpent: 0,
      isWalkIn: false
    };

    setCustomers(prev => [...prev, newCust]);
    setSelectedCustomerId(newCust.id);
    setIsAddingCustomer(false);
    setNewCustName('');
    setNewCustPhone('');
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServName || !newServPrice || !newServSku) return;

    const newServ: CatalogItem = {
      id: `s-${Date.now()}`,
      name: newServName,
      price: Number(newServPrice),
      category: newServCategory,
      icon: newServCategory === 'Tiffin & Cafe' ? '🥞' : newServCategory === 'Supermarket' ? '🌾' : '💇‍♂️',
      duration: Number(newServDuration),
      sku: newServSku.toUpperCase()
    };

    setServices(prev => [...prev, newServ]);
    setIsAddingService(false);
    setNewServName('');
    setNewServPrice('');
    setNewServSku('');
  };

  const handleCreateInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvName || !newInvStock || !newInvReorder || !newInvSku) return;

    const newInv: MockInventoryItem = {
      id: `i-${Date.now()}`,
      name: newInvName,
      sku: newInvSku.toUpperCase(),
      stock: Number(newInvStock),
      reorderLevel: Number(newInvReorder),
      unit: 'pcs'
    };

    setInventory(prev => [...prev, newInv]);
    setIsAddingInventory(false);
    setNewInvName('');
    setNewInvStock('');
    setNewInvReorder('');
    setNewInvSku('');
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpTitle || !newExpAmount) return;

    const newExp: MockExpense = {
      id: `e-${Date.now()}`,
      title: newExpTitle,
      amount: Number(newExpAmount),
      category: newExpCategory,
      createdAt: new Date().toISOString()
    };

    setExpenses(prev => [...prev, newExp]);
    setIsAddingExpense(false);
    setNewExpTitle('');
    setNewExpAmount('');
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName || !newStaffCode || !newStaffPhone) return;

    const newS: MockStaffMember = {
      id: `st-${Date.now()}`,
      name: newStaffName,
      empCode: newStaffCode.toUpperCase(),
      contact: newStaffPhone,
      role: newStaffRole,
      status: 'Active'
    };

    setStaff(prev => [...prev, newS]);
    setIsAddingStaff(false);
    setNewStaffName('');
    setNewStaffCode('');
    setNewStaffPhone('');
  };

  const handleModifyStockValue = (id: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const nextVal = item.stock + delta;
        return { ...item, stock: nextVal >= 0 ? nextVal : 0 };
      }
      return item;
    }));
  };

  const handleExecuteCheckout = () => {
    if (cart.length === 0) return;

    setIsCheckingOut(true);
    setWebhookStatus('sending');

    const customerObj = customers.find(c => c.id === selectedCustomerId) || customers[0];
    const newBillNumber = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
    const checkoutBill: MockBill = {
      id: `b-${Date.now()}`,
      billNumber: newBillNumber,
      customerName: customerObj.name,
      customerPhone: customerObj.phone,
      items: cart.map(c => ({ name: c.item.name, price: c.item.price, qty: c.qty })),
      subtotal: getSubtotal(),
      discountAmount: getDiscount(),
      taxAmount: getGST(),
      totalAmount: getTotal(),
      paymentMethod,
      createdAt: new Date().toISOString(),
      status: 'Paid'
    };

    setTimeout(() => {
      setBills(prev => [checkoutBill, ...prev]);
      setRevenueTotal(prev => prev + checkoutBill.totalAmount);
      setBillsCount(prev => prev + 1);

      setCustomers(prev => prev.map(c => {
        if (c.id === customerObj.id) {
          return {
            ...c,
            visits: c.visits + 1,
            totalSpent: c.totalSpent + checkoutBill.totalAmount
          };
        }
        return c;
      }));

      setChartData(prev => prev.map((c, i) => {
        if (i === prev.length - 1) {
          return { ...c, revenue: c.revenue + checkoutBill.totalAmount };
        }
        return c;
      }));

      setLatestPrintedBill(checkoutBill);
      setWebhookStatus('delivered');
      setIsCheckingOut(false);
      setCart([]);
    }, 1500);
  };

  // FEEDBACK STATE VARIABLES
  const [feedbackRating, setFeedbackRating] = useState<number>(5);
  const [feedbackEmail, setFeedbackEmail] = useState<string>('');
  const [feedbackComment, setFeedbackComment] = useState<string>('');
  const [isFeedbackSubmitting, setIsFeedbackSubmitting] = useState<boolean>(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState<boolean>(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackEmail || !feedbackComment) return;

    setIsFeedbackSubmitting(true);
    setTimeout(() => {
      setIsFeedbackSubmitting(false);
      setFeedbackSuccess(true);
      setFeedbackEmail('');
      setFeedbackComment('');
      setFeedbackRating(5);
    }, 1200);
  };

  const totalExpenseSum = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-20 md:space-y-24">
      
      {/* ---------------------------------------------------- */}
      {/* SECTION 1: HERO CONTAINER */}
      {/* ---------------------------------------------------- */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          className="absolute -z-10 w-96 h-96 bg-[#006a61]/5 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="max-w-4xl space-y-8">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#006a61]/10 border border-[#006a61]/20 backdrop-blur-md text-[#006a61] text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <Sparkles size={14} />
            Enterprise Billing Platform
          </motion.div>

          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] text-[#1a1c1e]"
          >
            Smarter Billing.<br/>
            <span className="bg-gradient-to-r from-[#006a61] via-[#05f3ad] to-[#00b4d8] bg-clip-text text-transparent drop-shadow-sm">
              Instant Webhooks.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed font-sans"
          >
            Streamline point of sale checkout, sync warehouse stock in real time, and dispatch elegant invoices directly over WhatsApp. Fully GST compliant.
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <a 
              href="#demo"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#006a61] text-white font-extrabold text-base hover:bg-[#004d47] hover:shadow-[0_4px_20px_rgba(0,106,97,0.3)] transition-all transform hover:scale-[1.03] flex items-center justify-center gap-2"
            >
              Try Interactive Sandbox <ArrowRight size={18} />
            </a>
            <a 
              href="#/pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card border border-slate-200 text-slate-700 font-bold text-base hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              View Pricing plans
            </a>
          </motion.div>
        </div>
      </section>

      {/* VALUE HIGHLIGHTS BANNER */}
      <section className="glass-card rounded-3xl border border-slate-200 p-8 md:p-12 shadow-xl bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[#006a61]/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-center">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-[#006a61] font-mono">8 Seconds</h3>
            <p className="text-xs text-slate-505 font-bold uppercase tracking-wider">Fast Invoicing Checkout</p>
          </div>
          <div className="space-y-2 border-y md:border-y-0 md:border-x border-slate-200 py-6 md:py-0">
            <h3 className="text-3xl font-black text-[#006a61] font-mono">2.8x Faster</h3>
            <p className="text-xs text-slate-505 font-bold uppercase tracking-wider">Stock Rotation Cycles</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-[#006a61] font-mono">97% Rate</h3>
            <p className="text-xs text-slate-550 font-bold uppercase tracking-wider">On-Time Payment Recoveries</p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: FEATURES VISUAL SHOWCASE */}
      {/* ---------------------------------------------------- */}
      <section id="features" className="space-y-24 scroll-mt-24">
        <div className="text-center space-y-4">
          <span className="px-3 py-1 rounded-full bg-[#006a61]/10 border border-[#006a61]/20 text-[#006a61] text-xs font-bold uppercase tracking-widest">
            Core Modules Tour
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900">
            Inside the BillCom Ecosystem
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base font-medium">
            Explore the premium client dashboard views, inventory pipelines, and mobile-native modules.
          </p>
        </div>

        <div className="space-y-32">
          {/* Feature 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <span className="w-10 h-10 rounded-xl bg-[#006a61]/10 border border-[#006a61]/20 flex items-center justify-center text-[#006a61]">
                <Store size={20} />
              </span>
              <h3 className="font-display font-extrabold text-3xl text-slate-900 leading-tight">
                1. Frictionless POS Invoicing
              </h3>
              <p className="text-slate-650 text-base leading-relaxed font-sans">
                Speed up checkouts at supermarket registers, salon styling tables, or tiffin counters. The POS Invoicing screen allows cashiers to compile items and services, scan grocery barcodes, apply promo coupons, and calculate variable taxes (such as 18% GST) dynamically on checkout.
              </p>
              <ul className="space-y-3 text-sm font-semibold text-slate-600 font-sans">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Custom item catalog listings
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Tax-inclusive &amp; exclusive calculations
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Live ticket checkouts with coupon codes
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md glass-card rounded-2xl border border-slate-200 overflow-hidden shadow-lg p-5 bg-white space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Active Invoice</span>
                  <span className="text-[10px] font-bold text-[#006a61] bg-[#006a61]/10 border border-[#006a61]/25 px-2 py-0.5 rounded-full">
                    GST REGISTERED
                  </span>
                </div>
                <div className="space-y-2 font-sans text-left">
                  <div className="flex justify-between text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-200/50">
                    <span>🌾 Basmati Rice 5kg x1</span>
                    <span className="font-mono">₹450</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-200/50">
                    <span>🍾 Sunflower Oil 1L x2</span>
                    <span className="font-mono">₹360</span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-slate-800 bg-slate-50 p-2.5 rounded border border-slate-200/50">
                    <span>🍯 Pure Wild Honey 500g x1</span>
                    <span className="font-mono">₹290</span>
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-3 space-y-2 text-xs font-semibold text-slate-550 font-sans">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono text-slate-800">₹1,100</span>
                  </div>
                  <div className="flex justify-between text-[#006a61]">
                    <span>Discount (VIP10 applied)</span>
                    <span className="font-mono">-₹110</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5% Exclusive)</span>
                    <span className="font-mono text-slate-800">₹50</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-800 border-t border-slate-100 pt-3 relative">
                    <span>Grand Total</span>
                    <span className="font-mono text-[#006a61]">₹1,040</span>
                    <motion.div 
                      animate={{ scale: [0.9, 1.05, 0.9] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute right-24 -top-1 px-2 py-0.5 rounded border border-emerald-500 text-emerald-500 text-[10px] font-black uppercase tracking-widest rotate-[-12deg]"
                    >
                      PAID
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Staff Roles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-last lg:order-first">
              <div className="w-full max-w-sm glass-card rounded-2xl border border-slate-200 p-5 bg-white space-y-4 shadow-md text-slate-800">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-850 flex items-center gap-1.5 animate-pulse">
                    <Users size={14} className="text-[#006a61]" />
                    Staff Register &amp; Logs
                  </span>
                  <span className="text-[9px] font-mono text-slate-400">Terminal Node #01</span>
                </div>
                <div className="space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between p-2 bg-slate-50 border rounded-lg">
                    <div className="text-left">
                      <span className="font-bold block text-slate-800">Ravi Kumar</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Shift Started: 09:00 AM</span>
                    </div>
                    <span className="text-[9px] font-bold text-[#006a61] bg-[#006a61]/10 px-2 py-0.5 rounded">CASHIER</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-50 border rounded-lg">
                    <div className="text-left">
                      <span className="font-bold block text-slate-800">Anjali Sharma</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Shift Started: 08:30 AM</span>
                    </div>
                    <span className="text-[9px] font-bold text-[#006a61] bg-[#006a61]/10 px-2 py-0.5 rounded">MANAGER</span>
                  </div>
                </div>
                <div className="text-[9px] font-mono text-[#006a61] bg-[#e8f5f3] p-2 rounded flex items-center gap-1.5">
                  <Activity size={12} className="animate-pulse" />
                  <span>Audit Log: Cashier Rajesh checked out INV-8921.</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-left">
              <span className="w-10 h-10 rounded-xl bg-[#006a61]/10 border border-[#006a61]/20 flex items-center justify-center text-[#006a61]">
                <ShieldCheck size={20} />
              </span>
              <h3 className="font-display font-extrabold text-3xl text-slate-900 leading-tight">
                2. Staff Roles &amp; Audit Trails
              </h3>
              <p className="text-slate-600 text-base leading-relaxed font-sans">
                Configure store personnel roles to secure cashier registers. Assign usernames and credential blocks with varying permission levels. Owners can set custom roles (stylists, grocery cashiers, or kitchen servers) restricting write-access configs.
              </p>
              <ul className="space-y-3 text-sm font-semibold text-slate-600 font-sans">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Secure Owner, Manager, and Cashier tiers
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Log active cashier terminal sessions
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Record modification audits on invoices
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3: WhatsApp */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <span className="w-10 h-10 rounded-xl bg-[#006a61]/10 border border-[#006a61]/20 flex items-center justify-center text-[#006a61]">
                <MessageSquare size={20} />
              </span>
              <h3 className="font-display font-extrabold text-3xl text-slate-900 leading-tight">
                3. WhatsApp Webhooks &amp; Customer CRM
              </h3>
              <p className="text-slate-600 text-base leading-relaxed font-sans">
                Eliminate expensive paper printing or SMS packages. On billing checkout, the system automatically retrieves customer profiles from the integrated Customer CRM database (tracking grocery purchase frequencies, dining orders, or styling histories) and dispatches receipt details instantly over the WhatsApp API gateway.
              </p>
              <ul className="space-y-3 text-sm font-semibold text-slate-600 font-sans">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Seamless client database tracking
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Automated PDF invoice dispatching
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Customized re-booking voucher tags
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="w-56 h-[380px] bg-slate-900 border-[6px] border-slate-800 rounded-[36px] shadow-2xl relative p-1.5 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-14 h-3.5 bg-slate-800 rounded-full z-20 flex items-center justify-center">
                  <div className="w-8 h-1 bg-slate-700 rounded-full" />
                </div>
                <div className="bg-[#075E54] pt-6 pb-2 px-3 text-white flex items-center justify-between flex-shrink-0 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center font-bold text-[8px]">BC</span>
                    <span className="text-[10px] font-bold">BillCom Gateway</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-pulse" />
                </div>
                <div className="flex-1 bg-[#ECE5DD] p-3 space-y-3 overflow-y-auto relative flex flex-col justify-end">
                  <div className="p-2 rounded bg-white/95 border border-slate-200 text-[8px] font-semibold text-slate-700 mb-2 shadow-inner">
                    <div className="text-slate-900 font-bold mb-0.5 text-left">👤 Client profile matched</div>
                    <div className="text-left font-sans">Name: Rakesh Yadav</div>
                    <div className="text-left font-sans">Total Visits: 8 | Spent: ₹14,200</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#DCF8C6] border border-emerald-200 text-[9px] max-w-[85%] self-end text-slate-805 leading-snug shadow-sm space-y-1.5 relative text-left">
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 p-1.5 rounded text-[#075e54] font-bold font-mono">
                      <FileText size={12} />
                      <span>Receipt_BC-8921.pdf</span>
                    </div>
                    <p>Here is your invoice receipt card (Total: ₹1,040). Use promo WELCOME10 for 10% off next visit.</p>
                    <div className="flex justify-end items-center gap-0.5 text-blue-500">
                      <span className="text-[7px] text-slate-405 font-semibold font-sans">15:42</span>
                      <CheckCircle2 size={8} className="text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Bluetooth Printing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-last lg:order-first">
              <div className="relative flex flex-col items-center">
                <div className="absolute bottom-[60px] w-40 h-[120px] overflow-hidden z-10 flex flex-col justify-end pointer-events-none">
                  <motion.div
                    animate={{ y: [40, 0, 40] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-full bg-slate-50 border-x border-b border-gray-300 p-2 font-mono text-[6px] text-slate-700 leading-normal"
                    style={{ 
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 98%, 95% 100%, 90% 98%, 85% 100%, 80% 98%, 75% 100%, 70% 98%, 65% 100%, 60% 98%, 55% 100%, 50% 98%, 45% 100%, 40% 98%, 35% 100%, 30% 98%, 25% 100%, 20% 98%, 15% 100%, 10% 98%, 5% 100%, 0% 100%)',
                      height: '110px'
                    }}
                  >
                    <div className="text-center font-bold border-b border-dashed border-gray-400 pb-0.5">
                      BILLCOM PRINT
                    </div>
                    <div className="flex justify-between py-0.5 text-left">
                      <span>INV: BC-8921</span>
                      <span>01/07/2026</span>
                    </div>
                    <div className="border-y border-dashed border-gray-400 py-1 my-0.5 text-left">
                      <div className="flex justify-between">
                        <span>2x Masala Dosa</span>
                        <span>₹240</span>
                      </div>
                      <div className="flex justify-between">
                        <span>2x Filter Coffee</span>
                        <span>₹60</span>
                      </div>
                    </div>
                    <div className="text-right font-black text-slate-900 mt-1">
                      TOTAL: ₹300
                    </div>
                  </motion.div>
                </div>

                <div className="w-48 h-24 bg-gradient-to-b from-slate-100 to-slate-200 rounded-b-xl rounded-t-md border-x-2 border-b-2 border-slate-300 shadow-md p-3 relative z-20 flex flex-col justify-between text-slate-800">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-2 bg-slate-900 rounded-full border border-slate-400" />
                  <div className="flex justify-between items-start text-[8px]">
                    <span className="font-bold text-[#006a61] uppercase tracking-wider">BT Printer Active</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] block" />
                  </div>
                  <div className="flex justify-between items-end border-t border-slate-200 pt-2 text-[6px] font-mono text-slate-405">
                    <span>RP-80 CORE</span>
                    <span className="bg-slate-200 border border-slate-300 px-1 py-0.5 rounded text-slate-600">FEED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-left">
              <span className="w-10 h-10 rounded-xl bg-[#006a61]/10 border border-[#006a61]/20 flex items-center justify-center text-[#006a61]">
                <Printer size={20} />
              </span>
              <h3 className="font-display font-extrabold text-3xl text-slate-900 leading-tight">
                4. Bluetooth Thermal Printing
              </h3>
              <p className="text-slate-600 text-base leading-relaxed font-sans">
                For cashiers needing physical paper records, the mobile app provides native Bluetooth print drivers. Store managers can scan nearby Bluetooth printers, connect registers wirelessly, and select customized formats including 58mm or 80mm layouts.
              </p>
              <ul className="space-y-3 text-sm font-semibold text-slate-600 font-sans">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Wireless Bluetooth scanning &amp; bonding
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Customized receipt footer messages
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Thermal printer temperature diagnostics
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 5: Expenses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <span className="w-10 h-10 rounded-xl bg-[#006a61]/10 border border-[#006a61]/20 flex items-center justify-center text-[#006a61]">
                <Truck size={20} />
              </span>
              <h3 className="font-display font-extrabold text-3xl text-slate-900 leading-tight">
                5. Expenses &amp; Vendor Restocks
              </h3>
              <p className="text-slate-600 text-base leading-relaxed font-sans">
                Track and audit store costs (rent, salon supplies, cafe dairy products, or supermarket bulk cargo) in a central database ledger. The stock manager links inventory catalog limits directly to backend supplier restock APIs (`PurchasesController`), triggering automated purchase orders POs when stock counts fall low.
              </p>
              <ul className="space-y-3 text-sm font-semibold text-slate-600 font-sans">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Record rental, salaries, and utility logs
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Low stock limit alerts &amp; supplier notifications
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Coordinate vendor restock purchase balances
                </li>
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-sm glass-card rounded-2xl border border-slate-200 p-5 bg-white space-y-4 shadow-md text-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 animate-pulse">
                    <Truck size={14} className="text-[#006a61]" />
                    Warehouse Reorders
                  </span>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    restockingState === 'low' 
                      ? 'bg-rose-100 border border-rose-200 text-rose-600' 
                      : restockingState === 'ordered' 
                        ? 'bg-orange-100 border border-orange-200 text-orange-600'
                        : 'bg-emerald-100 border border-emerald-200 text-emerald-600'
                  }`}>
                    {restockingState === 'low' ? 'Low Stock Alert' : restockingState === 'ordered' ? 'Auto-PO Sent' : 'Restocked'}
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 space-y-3 font-sans">
                  <div className="flex justify-between text-xs font-semibold text-slate-705">
                    <span className="text-left text-slate-700">Organic Hair Conditioner</span>
                    <span className="font-mono font-bold text-slate-850">{replenishStock} units left</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${replenishStock <= 5 ? 'bg-rose-500' : 'bg-[#006a61]'}`} 
                      style={{ width: `${(replenishStock / 50) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
                    <span>Reorder Limit: 5</span>
                    <span>Capacity: 50</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {restockingState === 'ordered' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-orange-50 border border-orange-200 text-[10px] font-semibold text-orange-700 rounded-lg flex items-center gap-2"
                    >
                      <RefreshCw size={12} className="animate-spin" />
                      <span>PO-109 triggered to supplier for 50 units</span>
                    </motion.div>
                  )}
                  {restockingState === 'full' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-emerald-50 border border-emerald-200 text-[10px] font-semibold text-emerald-700 rounded-lg flex items-center gap-2"
                    >
                      <CheckCircle2 size={12} />
                      <span>Restocked (+50)! (Rent/Utility Logs Balanced)</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center order-last lg:order-first">
              <div className="w-full max-w-sm glass-card rounded-2xl border border-slate-200 p-5 bg-white space-y-4 shadow-md text-slate-800">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-mono">
                    <Activity size={14} className="text-[#006a61] animate-pulse" />
                    Branch Nodes Telemetry
                  </span>
                  <span className="text-[9px] font-bold text-[#006a61] bg-[#006a61]/10 px-2 py-0.5 rounded-full">
                    ACTIVE SYNC
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-50 border rounded-lg flex items-center justify-between text-xs font-semibold text-left font-sans">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-[#006a61]" />
                      <span>HQ Main Register</span>
                    </div>
                    <span className="font-mono text-[#006a61] font-bold">Online</span>
                  </div>
                  <div className="p-3 bg-slate-50 border rounded-lg flex items-center justify-between text-xs font-semibold text-left font-sans">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-[#006a61]" />
                      <span>Downtown Terminal</span>
                    </div>
                    <span className="font-mono text-[#006a61] font-bold">Online</span>
                  </div>
                </div>
                <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>Signal Strength: 100%</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#006a61] rounded-full animate-ping" />
                    HQ Synchronized
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-left">
              <span className="w-10 h-10 rounded-xl bg-[#006a61]/10 border border-[#006a61]/20 flex items-center justify-center text-[#006a61]">
                <Database size={20} />
              </span>
              <h3 className="font-display font-extrabold text-3xl text-slate-900 leading-tight">
                6. Franchise Multi-Branch Sync
              </h3>
              <p className="text-slate-600 text-base leading-relaxed font-sans">
                Manage multiple stores from a single consolidated cloud dashboard. Franchise owners can sync active pricing configurations across branches, inspect employee checkout logs, view global tax audits, and switch between regional nodes seamlessly.
              </p>
              <ul className="space-y-3 text-sm font-semibold text-slate-600 font-sans">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Real-time database telemetry streams
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Consolidate regional taxes and audits
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#006a61]" /> Monitor cashier session logs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: INTERACTIVE DEMO (POS) */}
      {/* ---------------------------------------------------- */}
      <section id="demo" className="space-y-12 scroll-mt-24">
        <div className="text-center space-y-4">
          <span className="px-3 py-1 rounded-full bg-[#006a61]/10 border border-[#006a61]/20 text-[#006a61] text-xs font-bold uppercase tracking-widest">
            Interactive Product Sandbox
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900">
            Click, Bill and Checkout
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base font-medium">
            Interact with the real-time store registers mockup inside this fully simulated local browser environment.
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto rounded-2xl p-2 bg-gradient-to-b from-slate-200 to-transparent border border-slate-200 shadow-xl relative">
          <div className="rounded-xl overflow-hidden glass-card aspect-[16/9] min-h-[560px] relative flex flex-col border border-[#006a61]/10">
            
            {/* Window Header */}
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 block" />
              </div>
              <div className="px-3 py-1 bg-slate-105 border border-slate-200 rounded-md text-xs font-mono text-[#006a61] flex items-center gap-2">
                <Activity size={12} className="animate-pulse" />
                https://demo.billcom.pro/{activeTab}
              </div>
              <div className="flex gap-2">
                <div className="bg-white border border-slate-200 rounded px-2.5 py-0.5 text-[10px] font-bold text-[#006a61]">
                  {businessName}
                </div>
              </div>
            </div>

            {/* Application Content Grid */}
            <div className="flex-1 grid grid-cols-12 overflow-hidden bg-[#f8fafc]">
              
              {/* SIDEBAR NAVIGATION */}
              <div className="col-span-3 border-r border-slate-200 bg-slate-50/50 p-3.5 space-y-4 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <Store size={13} className="text-[#006a61]" />
                    <span className="text-[10px] font-bold text-slate-700 truncate">{businessName}</span>
                  </div>

                  <button 
                    onClick={() => setActiveTab('pos')}
                    className="w-full bg-[#006a61] text-[#ffffff] font-sans text-[10px] font-semibold py-2 px-3 rounded-lg hover:bg-opacity-90 active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-[#006a61]/10 cursor-pointer"
                  >
                    <Plus size={12} />
                    <span>New Bill</span>
                  </button>
                  
                  <div className="space-y-0.5">
                    {[
                      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                      { id: 'pos', label: 'Billing', icon: Receipt },
                      { id: 'invoices', label: 'Invoices', icon: FileText },
                      { id: 'crm', label: 'Customers', icon: Users },
                      { id: 'services', label: 'Services', icon: Sparkles },
                      { id: 'inventory', label: 'Inventory', icon: Boxes },
                      { id: 'staff', label: 'Staff', icon: SquareUser },
                      { id: 'settings', label: 'Settings', icon: Settings },
                      { id: 'expenses', label: 'Expenses', icon: Wallet }
                    ].map((item) => {
                      const IconComponent = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id as any)}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                            isActive 
                              ? 'bg-[#86f2e4]/30 text-[#006f66] scale-[0.98]' 
                              : 'text-[#45464d] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                          }`}
                        >
                          <IconComponent size={13} className={isActive ? 'text-[#006f66]' : 'text-[#76777d]'} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="text-[8px] font-mono text-slate-400 border-t border-slate-200/60 pt-2 text-left">
                  Role: Store Owner<br/>
                  Node Status: Synced
                </div>
              </div>

              {/* MAIN VIEWPORT CONTAINER */}
              <div className="col-span-9 p-5 overflow-y-auto flex flex-col justify-between h-full bg-[#f8fafc]">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: DASHBOARD */}
                  {activeTab === 'dashboard' && (
                    <motion.div
                      key="dashboard"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 flex-1 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-left">
                          <h3 className="font-display text-base font-extrabold text-slate-800">Today's Overview</h3>
                          <p className="text-[10px] text-slate-505">Live metrics for active cashier logs</p>
                        </div>
                        <button 
                          onClick={() => setActiveTab('pos')}
                          className="bg-[#006a61] text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-[#004d47] shadow transition-colors cursor-pointer"
                        >
                          New Quick Bill
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-2.5">
                        {[
                          { label: "Today's Revenue", val: `₹${revenueTotal.toLocaleString()}`, status: 'Live feed', icon: DollarSign, color: '#006a61' },
                          { label: 'Bills Generated', val: `${billsCount}`, status: 'Active counts', icon: Receipt, color: '#006a61' },
                          { label: 'Registered Clients', val: `${customers.length}`, status: 'CRM database', icon: Users, color: '#006a61' },
                          { label: 'Low Stock Alerts', val: `${lowStockCount}`, status: 'Safety warnings', icon: AlertTriangle, color: '#ba1a1a' }
                        ].map((metric, i) => (
                          <div key={i} className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] font-bold text-slate-400 uppercase">{metric.label}</span>
                              <metric.icon size={11} style={{ color: metric.color }} />
                            </div>
                            <div className="mt-2 text-left font-sans">
                              <div className="text-sm font-extrabold text-slate-800 font-mono leading-none">{metric.val}</div>
                              <span className="text-[8px] font-bold text-slate-400 mt-1 block">{metric.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-12 gap-3 flex-1 my-1">
                        <div className="col-span-8 bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between shadow-sm">
                          <span className="text-[8px] font-bold text-slate-400 uppercase mb-2 text-left">Revenue Trend (Last 7 Days)</span>
                          <div className="h-24 flex items-end justify-between gap-2 relative">
                            {hoveredBarIndex !== null && (
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 bg-[#1a1c1e] text-[#05f3ad] text-[9px] font-mono font-bold px-2 py-0.5 rounded shadow z-10 border border-slate-700">
                                {chartData[hoveredBarIndex].day}: ₹{chartData[hoveredBarIndex].revenue.toLocaleString()}
                              </div>
                            )}
                            {chartData.map((data, idx) => {
                              const maxVal = Math.max(...chartData.map(c => c.revenue));
                              const pct = (data.revenue / maxVal) * 100;
                              return (
                                <div 
                                  key={idx} 
                                  className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
                                  onMouseEnter={() => setHoveredBarIndex(idx)}
                                  onMouseLeave={() => setHoveredBarIndex(null)}
                                >
                                  <div 
                                    className={`w-full rounded-t-sm transition-all duration-300 ${
                                      idx === chartData.length - 1 
                                        ? 'bg-[#006a61]' 
                                        : 'bg-[#006a61]/30 group-hover:bg-[#006a61]/60'
                                    }`}
                                    style={{ height: `${pct}%` }}
                                  />
                                  <span className="text-[8px] font-bold text-slate-400 mt-1 font-mono">{data.day}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="col-span-4 bg-white border border-slate-200 p-3 rounded-xl shadow-sm flex flex-col justify-between">
                          <span className="text-[8px] font-bold text-slate-400 uppercase mb-2 text-left font-sans">Top Demand</span>
                          <div className="space-y-1.5 overflow-y-auto max-h-[90px]">
                            {[
                              { name: 'Hair Cut & Styling', count: 48, revenue: 57600 },
                              { name: 'Deep Spa Massage', count: 32, revenue: 80000 }
                            ].map((item, i) => (
                              <div key={i} className="flex justify-between items-center text-[9px] p-1 hover:bg-slate-50 rounded font-sans">
                                <div className="flex items-center gap-1 truncate pr-1">
                                  <Scissors size={9} className="text-[#006a61] flex-shrink-0" />
                                  <div className="truncate">
                                    <span className="font-bold text-slate-800 block truncate text-left">{item.name}</span>
                                    <span className="text-[7px] text-slate-405 block text-left">{item.count} billed</span>
                                  </div>
                                </div>
                                <span className="font-mono font-bold text-[#006a61]">₹{item.revenue.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-8 bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm overflow-hidden">
                          <span className="text-[8px] font-bold text-slate-400 uppercase mb-2 border-b border-slate-100 pb-1 block text-left font-sans">Recent Activity Logs</span>
                          <table className="w-full text-left border-collapse text-[9px]">
                            <thead>
                              <tr>
                                <th className="py-1 font-bold text-slate-400 font-sans">Bill No.</th>
                                <th className="py-1 font-bold text-slate-400 font-sans">Customer</th>
                                <th className="py-1 font-bold text-slate-400 font-sans">Method</th>
                                <th className="py-1 font-bold text-slate-400 text-right font-sans">Grand Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bills.slice(0, 2).map((bill) => (
                                <tr key={bill.id} className="border-t border-slate-100 hover:bg-slate-50">
                                  <td className="py-1.5 font-bold text-[#006a61]">{bill.billNumber}</td>
                                  <td className="py-1.5 text-slate-700 text-left">{bill.customerName}</td>
                                  <td className="py-1.5 text-slate-505 text-left">{bill.paymentMethod}</td>
                                  <td className="py-1.5 text-right font-bold text-slate-800 font-mono">₹{bill.totalAmount.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="col-span-4 bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm flex flex-col justify-between text-slate-800 text-left">
                          <div>
                            <span className="text-[8px] font-bold text-slate-400 uppercase mb-1 block font-sans">Net Profit Balance</span>
                            <div className="text-sm font-black font-mono text-[#006a61]">₹{(revenueTotal - totalExpenseSum).toLocaleString()}</div>
                          </div>
                          <div className="text-[7px] text-slate-400 font-medium font-sans">
                            Logged Expenses: ₹{totalExpenseSum.toLocaleString()}<br/>
                            Billed Audits: {billsCount} orders
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: BILLING */}
                  {activeTab === 'pos' && (
                    <motion.div
                      key="pos"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-12 gap-4 flex-1 items-start h-full relative"
                    >
                      <AnimatePresence>
                        {isCheckingOut && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white/95 z-30 flex flex-col items-center justify-center gap-4 text-center p-6 text-slate-800 rounded-xl border border-slate-200"
                          >
                            <RefreshCw size={30} className="text-[#006a61] animate-spin" />
                            <div>
                              <h4 className="font-bold text-slate-800 text-xs font-sans">Processing POS Invoicing...</h4>
                              <p className="text-[10px] text-slate-505 mt-1 font-sans">Generating thermal bill transaction template</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="col-span-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 font-mono block text-left">POS Catalog</span>
                        </div>
                        {/* Industry tabs filter */}
                        <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border text-[8px] font-bold">
                          {['All', 'Tiffin & Cafe', 'Salon & Spa', 'Supermarket'].map((tab) => (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => setIndustryFilter(tab as any)}
                              className={`flex-1 py-1 rounded text-center transition-all cursor-pointer ${
                                industryFilter === tab 
                                  ? 'bg-[#006a61] text-white shadow-sm' 
                                  : 'text-slate-500 hover:text-slate-800'
                              }`}
                            >
                              {tab === 'All' ? 'All' : tab.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
                          {services
                            .filter(s => industryFilter === 'All' || s.category === industryFilter)
                            .map((service) => (
                              <button
                                key={service.id}
                                onClick={() => addToCart(service)}
                                className="bg-white border border-slate-200 hover:bg-slate-50 p-2 rounded-xl flex items-center justify-between text-left transition-all group cursor-pointer shadow-sm"
                              >
                                <div className="flex items-center gap-1.5 truncate">
                                  <span className="text-base w-7 h-7 rounded bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner flex-shrink-0">
                                    {service.icon}
                                  </span>
                                  <div className="truncate">
                                    <h4 className="font-bold text-[10px] text-slate-800 truncate">{service.name}</h4>
                                    <span className="text-[7px] font-bold text-slate-400 bg-slate-105 px-1 rounded block w-max">
                                      {service.category} • {service.duration}m
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  <span className="text-[9px] font-extrabold font-mono text-[#006a61]">₹{service.price}</span>
                                  <span className="w-4 h-4 rounded bg-[#006a61]/10 text-[#006a61] flex items-center justify-center group-hover:bg-[#006a61] group-hover:text-white transition-colors">
                                    <Plus size={8} />
                                  </span>
                                </div>
                              </button>
                            ))}
                        </div>
                      </div>

                      <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm space-y-3 flex flex-col justify-between min-h-[350px]">
                        <div>
                          <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 mb-2">
                            <span className="text-[9px] font-bold uppercase text-slate-700 font-mono">Invoice compiled</span>
                            {cart.length > 0 && (
                              <button onClick={() => setCart([])} className="text-[8px] font-bold text-rose-500 uppercase cursor-pointer">Clear</button>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 mb-2 bg-slate-50 border border-slate-200/55 p-1.5 rounded-lg text-left">
                            <div className="flex-1 font-sans">
                              <label className="text-[7px] font-bold text-slate-400 uppercase block">Selected Customer</label>
                              <select 
                                value={selectedCustomerId}
                                onChange={(e) => setSelectedCustomerId(e.target.value)}
                                className="w-full bg-transparent text-[9px] font-bold text-slate-700 outline-none cursor-pointer"
                              >
                                {customers.map(c => (
                                  <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                                ))}
                              </select>
                            </div>
                            <button 
                              onClick={() => setIsAddingCustomer(true)} 
                              className="w-5 h-5 rounded bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          <div className="space-y-1 overflow-y-auto max-h-[120px] pr-1">
                            {cart.length === 0 ? (
                              <div className="h-[100px] flex flex-col items-center justify-center text-center text-slate-400 gap-1 border border-dashed border-slate-200 rounded-lg bg-slate-50/50">
                                <ShoppingBag size={14} className="text-slate-350" />
                                <p className="text-[9px] font-bold text-slate-505 font-sans">Invoice compiled is empty</p>
                              </div>
                            ) : (
                              cart.map((cartItem) => (
                                <div key={cartItem.item.id} className="flex justify-between items-center p-1.5 rounded bg-slate-50 border border-slate-200 text-slate-800 text-[9px] font-sans">
                                  <div className="truncate pr-1 text-left">
                                    <h5 className="font-bold text-slate-800 truncate">{cartItem.item.name}</h5>
                                  </div>
                                  <div className="flex items-center gap-1.5 flex-shrink-0">
                                    <div className="flex items-center bg-white border border-slate-200 rounded overflow-hidden">
                                      <button 
                                        onClick={() => updateQty(cartItem.item.id, -1)}
                                        className="w-3.5 h-3.5 flex items-center justify-center text-slate-505 hover:bg-slate-100 cursor-pointer"
                                      >
                                        <Minus size={6} />
                                      </button>
                                      <span className="font-bold font-mono px-1 text-slate-800">{cartItem.qty}</span>
                                      <button 
                                        onClick={() => updateQty(cartItem.item.id, 1)}
                                        className="w-3.5 h-3.5 flex items-center justify-center text-slate-550 hover:bg-slate-100 cursor-pointer"
                                      >
                                        <Plus size={6} />
                                      </button>
                                    </div>
                                    <span className="font-extrabold text-slate-800 font-mono w-10 text-right">
                                      ₹{cartItem.item.price * cartItem.qty}
                                    </span>
                                    <button 
                                      onClick={() => removeFromCart(cartItem.item.id)}
                                      className="text-slate-400 hover:text-rose-500 cursor-pointer transition-colors p-0.5"
                                    >
                                      <Trash2 size={9} />
                                    </button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        <div className="space-y-1 text-[9px] font-semibold text-slate-505 border-t border-slate-150 pt-2 text-left font-sans">
                          <form onSubmit={handleApplyPromo} className="flex gap-1 mb-2">
                            <div className="relative flex-1">
                              <input 
                                type="text" 
                                placeholder="Promo coupon e.g. VIP10" 
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                                className="w-full border border-slate-200 rounded px-2 py-0.5 text-[8px] outline-none focus:border-[#006a61] bg-slate-50 font-mono font-bold"
                              />
                              <Percent size={7} className="absolute right-2 top-1.5 text-slate-400" />
                            </div>
                            <button type="submit" className="bg-slate-100 border border-slate-200 px-2 rounded text-[7px] font-bold cursor-pointer hover:bg-slate-200">
                              Apply
                            </button>
                          </form>

                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-mono text-slate-800">₹{getSubtotal()}</span>
                          </div>
                          <div className="flex justify-between text-[#006a61] font-bold">
                            <span>Promo ({appliedDiscountCode} - {appliedDiscountPercent}% applied)</span>
                            <span className="font-mono">- ₹{getDiscount()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>GST ({taxRate}% Settings Config)</span>
                            <span className="font-mono text-slate-800">₹{getGST()}</span>
                          </div>
                          <div className="flex justify-between text-[11px] font-black text-slate-800 border-t border-slate-100 pt-1.5 font-sans">
                            <span>Grand Total</span>
                            <span className="font-mono text-[#006a61]">₹{getTotal()}</span>
                          </div>

                          <div className="grid grid-cols-3 gap-1 pt-1.5">
                            {['UPI', 'Cash', 'Card'].map((m) => (
                              <button
                                key={m}
                                onClick={() => setPaymentMethod(m as any)}
                                className={`py-0.5 rounded border font-mono text-[8px] font-bold transition-all cursor-pointer ${
                                  paymentMethod === m 
                                    ? 'bg-[#006a61] text-white border-[#006a61]' 
                                    : 'bg-white text-slate-505 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                {m}
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={handleExecuteCheckout}
                            disabled={cart.length === 0}
                            className={`w-full py-2 rounded-lg mt-1.5 font-extrabold text-[9px] uppercase tracking-widest flex items-center justify-center gap-1 transition-all transform scale-[1.01] ${
                              cart.length > 0
                                ? 'bg-[#006a61] text-white hover:bg-[#004d47] cursor-pointer shadow'
                                : 'bg-slate-105 text-slate-400 border border-slate-200 cursor-not-allowed'
                            }`}
                          >
                            <Send size={9} />
                            Checkout &amp; Print Bill
                          </button>
                        </div>
                      </div>

                      {/* Thermal Printer Simulator */}
                      <div className="col-span-3 flex flex-col items-center justify-center self-center h-full pt-2">
                        <div className="relative flex flex-col items-center">
                          <div className="absolute bottom-[75px] left-1/2 transform -translate-x-1/2 w-[110px] h-[160px] overflow-hidden pointer-events-none z-10 flex flex-col justify-end">
                            <AnimatePresence>
                              {(webhookStatus === 'sending' || webhookStatus === 'delivered') && latestPrintedBill && (
                                <motion.div
                                  initial={{ y: 160 }}
                                  animate={{ y: webhookStatus === 'sending' ? 60 : 0 }}
                                  exit={{ y: 160, opacity: 0 }}
                                  className="w-[110px] mx-auto bg-slate-50 text-slate-900 border-x border-b border-gray-300 shadow-md p-2 font-mono text-[5px] leading-relaxed flex flex-col justify-between text-left"
                                  style={{ 
                                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 98%, 97% 100%, 94% 98%, 91% 100%, 88% 98%, 85% 100%, 82% 98%, 79% 100%, 76% 98%, 73% 100%, 70% 98%, 67% 100%, 64% 98%, 61% 100%, 58% 98%, 55% 100%, 52% 98%, 49% 100%, 46% 98%, 43% 100%, 40% 98%, 37% 100%, 34% 98%, 31% 100%, 28% 98%, 25% 100%, 22% 98%, 19% 105%, 16% 98%, 13% 100%, 10% 98%, 7% 100%, 4% 98%, 0% 100%)',
                                    minHeight: '130px'
                                  }}
                                >
                                  <div className="space-y-0.5">
                                    <div className="text-center font-bold border-b border-dashed border-gray-400 pb-0.5">
                                      <span className="text-[7px] block uppercase font-display">{businessName}</span>
                                    </div>
                                    <div className="flex justify-between py-0.5 text-gray-505">
                                      <span>{latestPrintedBill.billNumber}</span>
                                      <span>{new Date(latestPrintedBill.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="border-y border-dashed border-gray-400 py-0.5 my-0.5 space-y-0.5">
                                      {latestPrintedBill.items.map((i, idx) => (
                                        <div key={idx} className="flex justify-between">
                                          <span>{i.qty}x {i.name}</span>
                                          <span>₹{i.price * i.qty}</span>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="space-y-0.5 text-right font-bold text-slate-800">
                                      <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>₹{latestPrintedBill.subtotal}</span>
                                      </div>
                                      <div className="flex justify-between text-emerald-700">
                                        <span>Disc ({appliedDiscountPercent}%):</span>
                                        <span>-₹{latestPrintedBill.discountAmount}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>GST ({taxRate}%):</span>
                                        <span>₹{latestPrintedBill.taxAmount}</span>
                                      </div>
                                      <div className="flex justify-between text-[6px] font-black border-t border-dashed border-gray-400 pt-0.5 mt-0.5 text-black">
                                        <span>TOTAL:</span>
                                        <span>₹{latestPrintedBill.totalAmount}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-center border-t border-dashed border-gray-400 mt-1">
                                    <span className="text-[4px] text-gray-400 block font-bold mt-1 font-sans">{receiptFooter}</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <motion.div
                            animate={webhookStatus === 'sending' ? {
                              x: [0, -1.2, 1.2, -1, 1, -1.2, 1.2, 0],
                              y: [0, 0.4, -0.4, 0.4, -0.4, 0.4, -0.4, 0]
                            } : {}}
                            transition={{ repeat: webhookStatus === 'sending' ? Infinity : 0, duration: 0.12 }}
                            className="w-36 h-24 bg-gradient-to-b from-slate-100 to-slate-200 rounded-b-2xl rounded-t-lg border-x-4 border-b-4 border-slate-300 shadow-md flex flex-col justify-between p-2 relative z-20"
                          >
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-1.5 bg-slate-900 rounded-full border border-slate-400 shadow-inner" />
                            <div className="flex justify-between items-start mt-1 text-slate-800">
                              <div className="space-y-0.5 text-left font-sans">
                                <span className="text-[7px] font-black tracking-widest text-[#006a61] uppercase block leading-none">BillCom</span>
                                <span className="text-[5px] font-bold text-slate-400 block leading-none">Thermal</span>
                              </div>
                              <div className="flex gap-1">
                                <div className={`w-1 h-1 rounded-full ${
                                  webhookStatus === 'sending' 
                                    ? 'bg-amber-400 shadow-[0_0_5px_#f59e0b]' 
                                    : 'bg-emerald-500/20'
                                }`} />
                                <div className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee]" />
                              </div>
                            </div>
                            <div className="flex justify-between items-end border-t border-slate-300 pt-1.5 font-sans">
                              <span className="text-[4px] font-mono text-slate-400">RP-80 CORE</span>
                              <button 
                                onClick={() => { setWebhookStatus('idle'); setLatestPrintedBill(null); }}
                                disabled={webhookStatus !== 'delivered'}
                                className={`px-1 rounded text-[5px] font-bold uppercase ${
                                  webhookStatus === 'delivered'
                                    ? 'bg-rose-50 border border-rose-200 text-rose-600 cursor-pointer hover:bg-rose-100'
                                    : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                              >
                                Tear
                              </button>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: INVOICES */}
                  {activeTab === 'invoices' && (
                    <motion.div
                      key="invoices"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 flex-1 flex flex-col justify-between"
                    >
                      <div className="text-left font-sans">
                        <h3 className="font-display text-base font-extrabold text-slate-800">Invoices History</h3>
                        <p className="text-[10px] text-slate-500">Inspect historical cashier orders and print details</p>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm flex-1 overflow-y-auto">
                        <table className="w-full text-left border-collapse text-[10px]">
                          <thead>
                            <tr className="border-b border-slate-250">
                              <th className="py-2 font-bold text-slate-400 font-sans">Bill No.</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Customer Name</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Payment</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Date Logged</th>
                              <th className="py-2 font-bold text-slate-400 text-right font-sans">Grand Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bills.map((bill) => (
                              <tr 
                                key={bill.id} 
                                onClick={() => setSelectedInvoiceForModal(bill)}
                                className="border-t border-slate-100 hover:bg-[#eff4ff] cursor-pointer transition-colors"
                              >
                                <td className="py-2.5 font-bold text-[#006a61]">{bill.billNumber}</td>
                                <td className="py-2.5 text-slate-700 font-bold text-left">{bill.customerName}</td>
                                <td className="py-2.5 text-slate-500 text-left">{bill.paymentMethod}</td>
                                <td className="py-2.5 text-slate-400 text-left">{new Date(bill.createdAt).toLocaleDateString()}</td>
                                <td className="py-2.5 text-right font-bold text-slate-800 font-mono">₹{bill.totalAmount.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: SERVICES */}
                  {activeTab === 'services' && (
                    <motion.div
                      key="services"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 flex-1 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-left font-sans">
                          <h3 className="font-display text-base font-extrabold text-slate-800">Services Catalog</h3>
                          <p className="text-[10px] text-slate-500">Configure salon, spa, and beauty catalog parameters</p>
                        </div>
                        <button 
                          onClick={() => setIsAddingService(true)}
                          className="bg-[#006a61] text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-[#004d47] shadow transition-colors cursor-pointer font-sans"
                        >
                          Add New Service
                        </button>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm flex-1 overflow-y-auto">
                        <table className="w-full text-left border-collapse text-[10px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="py-2 font-bold text-slate-400 font-sans">Service Name</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">SKU Code</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Category</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Duration</th>
                              <th className="py-2 font-bold text-slate-400 text-right font-sans">Base Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {services.map((serv) => (
                              <tr key={serv.id} className="border-t border-slate-100 hover:bg-slate-50">
                                <td className="py-2.5 text-slate-855 font-bold flex items-center gap-1.5 text-left font-sans">
                                  <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center font-sans">{serv.icon}</span>
                                  {serv.name}
                                </td>
                                <td className="py-2.5 font-mono text-slate-400 uppercase">{serv.sku}</td>
                                <td className="py-2.5 text-slate-550 text-left font-sans">{serv.category}</td>
                                <td className="py-2.5 text-slate-505 text-left font-sans">{serv.duration || 45} mins</td>
                                <td className="py-2.5 text-right font-bold text-[#006a61] font-mono">₹{serv.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 5: INVENTORY */}
                  {activeTab === 'inventory' && (
                    <motion.div
                      key="inventory"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 flex-1 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-left font-sans">
                          <h3 className="font-display text-base font-extrabold text-slate-805">Inventory Stock</h3>
                          <p className="text-[10px] text-slate-500">Monitor physical supplies and warning levels</p>
                        </div>
                        <button 
                          onClick={() => setIsAddingInventory(true)}
                          className="bg-[#006a61] text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-[#004d47] shadow transition-colors cursor-pointer font-sans"
                        >
                          Add Stock Item
                        </button>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm flex-1 overflow-y-auto">
                        <table className="w-full text-left border-collapse text-[10px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="py-2 font-bold text-slate-400 font-sans">Product Name</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">SKU Code</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Status</th>
                              <th className="py-2 font-bold text-slate-400 text-center font-sans">Safety Level</th>
                              <th className="py-2 font-bold text-slate-400 text-right font-sans">Current Stock</th>
                            </tr>
                          </thead>
                          <tbody>
                            {inventory.map((item) => {
                              const isLow = item.stock <= item.reorderLevel;
                              return (
                                <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50">
                                  <td className="py-2.5 text-slate-855 font-bold text-left font-sans">{item.name}</td>
                                  <td className="py-2.5 font-mono text-slate-400 uppercase">{item.sku}</td>
                                  <td className="py-2.5">
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold font-sans ${
                                      isLow ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'
                                    }`}>
                                      {isLow ? 'Low Stock' : 'Healthy'}
                                    </span>
                                  </td>
                                  <td className="py-2.5 text-slate-505 text-center font-sans">{item.reorderLevel} {item.unit}</td>
                                  <td className="py-2.5 text-right font-bold text-slate-850 font-mono">
                                    <div className="flex items-center justify-end gap-2">
                                      <button 
                                        onClick={() => handleModifyStockValue(item.id, -1)}
                                        className="w-4 h-4 rounded bg-slate-105 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
                                      >
                                        -
                                      </button>
                                      <span>{item.stock} {item.unit}</span>
                                      <button 
                                        onClick={() => handleModifyStockValue(item.id, 5)}
                                        className="w-4 h-4 rounded bg-slate-105 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 6: CUSTOMERS */}
                  {activeTab === 'crm' && (
                    <motion.div
                      key="crm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 flex-1 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-left font-sans">
                          <h3 className="font-display text-base font-extrabold text-slate-800">Customers Directory</h3>
                          <p className="text-[10px] text-slate-500">Monitor client visitation statistics and billing balances</p>
                        </div>
                        <button 
                          onClick={() => setIsAddingCustomer(true)}
                          className="bg-[#006a61] text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-[#004d47] shadow transition-colors cursor-pointer font-sans"
                        >
                          Add New Customer
                        </button>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm flex-1 overflow-y-auto">
                        <table className="w-full text-left border-collapse text-[10px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="py-2 font-bold text-slate-400 font-sans">Customer Name</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Phone Number</th>
                              <th className="py-2 font-bold text-slate-400 text-center font-sans">Visits</th>
                              <th className="py-2 font-bold text-slate-400 text-right font-sans">Total Spent</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customers.map((c) => (
                              <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                                <td className="py-2.5 text-slate-800 font-bold flex items-center gap-1.5 text-left font-sans">
                                  <span className="w-5 h-5 rounded-full bg-slate-101 flex items-center justify-center font-sans">👤</span>
                                  {c.name}
                                </td>
                                <td className="py-2.5 text-slate-550 font-mono">{c.phone}</td>
                                <td className="py-2.5 text-slate-700 text-center font-bold font-sans">{c.visits}</td>
                                <td className="py-2.5 text-right font-bold text-[#006a61] font-mono">₹{c.totalSpent.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 7: STAFF */}
                  {activeTab === 'staff' && (
                    <motion.div
                      key="staff"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 flex-1 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-left font-sans">
                          <h3 className="font-display text-base font-extrabold text-slate-800">Staff Registry</h3>
                          <p className="text-[10px] text-slate-500">Coordinate employee registers and permission access levels</p>
                        </div>
                        <button 
                          onClick={() => setIsAddingStaff(true)}
                          className="bg-[#006a61] text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-[#004d47] shadow transition-colors cursor-pointer font-sans"
                        >
                          Onboard Staff
                        </button>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm flex-1 overflow-y-auto">
                        <table className="w-full text-left border-collapse text-[10px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="py-2 font-bold text-slate-400 font-sans">Employee Name</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Employee Code</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Phone Contact</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Assign Role</th>
                              <th className="py-2 font-bold text-slate-400 text-right font-sans">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {staff.map((s) => (
                              <tr key={s.id} className="border-t border-slate-100 hover:bg-slate-50">
                                <td className="py-2.5 text-slate-855 font-bold text-left font-sans">{s.name}</td>
                                <td className="py-2.5 font-mono text-slate-400 uppercase">{s.empCode}</td>
                                <td className="py-2.5 text-slate-500 font-sans">{s.contact}</td>
                                <td className="py-2.5 text-slate-500 font-bold font-sans">{s.role}</td>
                                <td className="py-2.5 text-right font-sans">
                                  <span className="px-2 py-0.5 rounded bg-emerald-100 border text-emerald-600 text-[8px] font-bold">
                                    {s.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 8: SETTINGS */}
                  {activeTab === 'settings' && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 flex-1 flex flex-col justify-start text-slate-800 text-left font-sans"
                    >
                      <div>
                        <h3 className="font-display text-base font-extrabold text-slate-805">Settings Panel</h3>
                        <p className="text-[10px] text-slate-500">Configure business parameters and tax ratios</p>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 max-w-md">
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Business Name</label>
                          <input 
                            type="text" 
                            value={businessName} 
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] font-bold outline-none focus:border-[#006a61] bg-slate-50"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">GST Tax Rate (%)</label>
                          <input 
                            type="number" 
                            value={taxRate} 
                            onChange={(e) => setTaxRate(Number(e.target.value))}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] font-bold outline-none focus:border-[#006a61] bg-slate-50"
                          />
                          <span className="text-[8px] text-slate-400 mt-1 block font-sans">* This rate will be dynamically calculated on POS checkout items.</span>
                        </div>
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Receipt Footer Message</label>
                          <input 
                            type="text" 
                            value={receiptFooter} 
                            onChange={(e) => setReceiptFooter(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] font-bold outline-none focus:border-[#006a61] bg-slate-50"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 9: EXPENSES */}
                  {activeTab === 'expenses' && (
                    <motion.div
                      key="expenses"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 flex-1 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center font-sans">
                        <div className="text-left">
                          <h3 className="font-display text-base font-extrabold text-slate-808">Expenses Ledger</h3>
                          <p className="text-[10px] text-slate-500">Record rents, utilities, and daily operations expenses</p>
                        </div>
                        <button 
                          onClick={() => setIsAddingExpense(true)}
                          className="bg-[#ba1a1a] text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-opacity-90 shadow transition-colors cursor-pointer font-sans"
                        >
                          Record Cost Expense
                        </button>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm flex-1 overflow-y-auto font-sans">
                        <table className="w-full text-left border-collapse text-[10px]">
                          <thead>
                            <tr className="border-b border-slate-200">
                              <th className="py-2 font-bold text-slate-400 font-sans">Expense Title</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Category</th>
                              <th className="py-2 font-bold text-slate-400 font-sans">Date Logged</th>
                              <th className="py-2 font-bold text-slate-400 text-right font-sans">Amount Deducted</th>
                            </tr>
                          </thead>
                          <tbody>
                            {expenses.map((exp) => (
                              <tr key={exp.id} className="border-t border-slate-100 hover:bg-slate-50">
                                <td className="py-2.5 text-slate-850 font-bold text-left">{exp.title}</td>
                                <td className="py-2.5">
                                  <span className="px-2 py-0.5 rounded bg-slate-100 border text-[8px] font-bold uppercase">{exp.category}</span>
                                </td>
                                <td className="py-2.5 text-slate-400 text-left">{new Date(exp.createdAt).toLocaleDateString()}</td>
                                <td className="py-2.5 text-right font-bold text-rose-600 font-mono">₹{exp.amount.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

            {/* CUSTOMER ADD DIALOG MODAL */}
            <AnimatePresence>
              {isAddingCustomer && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 z-40 flex items-center justify-center p-4 backdrop-blur-xs font-sans"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 15 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xl max-w-xs w-full text-slate-850 text-left"
                  >
                    <h4 className="font-display font-bold text-xs mb-3 border-b pb-1.5 text-left">Register New Customer</h4>
                    <form onSubmit={handleCreateCustomer} className="space-y-3">
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Customer Name</label>
                        <input 
                          type="text" required placeholder="e.g. David Miller" value={newCustName}
                          onChange={(e) => setNewCustName(e.target.value)}
                          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                        />
                      </div>
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Phone Number</label>
                        <input 
                          type="text" required placeholder="e.g. 9876543210" value={newCustPhone}
                          onChange={(e) => setNewCustPhone(e.target.value)}
                          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                        />
                      </div>
                      <div className="flex gap-2 justify-end pt-2">
                        <button type="button" onClick={() => setIsAddingCustomer(false)} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded text-[9px] font-bold cursor-pointer font-sans">Cancel</button>
                        <button type="submit" className="px-2.5 py-1.5 bg-[#006a61] text-white rounded text-[9px] font-bold cursor-pointer font-sans">Create</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SERVICE ADD DIALOG MODAL */}
            <AnimatePresence>
              {isAddingService && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 z-40 flex items-center justify-center p-4 backdrop-blur-xs font-sans"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 15 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xl max-w-xs w-full text-slate-850 text-left"
                  >
                    <h4 className="font-display font-bold text-xs mb-3 border-b pb-1.5 text-left font-sans">Configure New Service</h4>
                    <form onSubmit={handleCreateService} className="space-y-2.5">
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Service Name</label>
                        <input 
                          type="text" required placeholder="e.g. Hair Wash Premium" value={newServName}
                          onChange={(e) => setNewServName(e.target.value)}
                          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1 font-sans">Base Price (₹)</label>
                          <input 
                            type="number" required placeholder="e.g. 500" value={newServPrice}
                            onChange={(e) => setNewServPrice(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1 font-sans">SKU Code</label>
                          <input 
                            type="text" required placeholder="SB-HAIR-05" value={newServSku}
                            onChange={(e) => setNewServSku(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1 font-sans">Duration (m)</label>
                          <input 
                            type="number" required placeholder="45" value={newServDuration}
                            onChange={(e) => setNewServDuration(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1 font-sans">Category</label>
                          <select
                            value={newServCategory}
                            onChange={(e) => setNewServCategory(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans font-sans"
                          >
                            <option value="Tiffin & Cafe">Tiffin & Cafe</option>
                            <option value="Salon & Spa">Salon & Spa</option>
                            <option value="Supermarket">Supermarket</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end pt-2 font-sans">
                        <button type="button" onClick={() => setIsAddingService(false)} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-505 rounded text-[9px] font-bold cursor-pointer font-sans">Cancel</button>
                        <button type="submit" className="px-2.5 py-1.5 bg-[#006a61] text-white rounded text-[9px] font-bold cursor-pointer font-sans">Create</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* INVENTORY ADD DIALOG MODAL */}
            <AnimatePresence>
              {isAddingInventory && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 z-40 flex items-center justify-center p-4 backdrop-blur-xs font-sans"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 15 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xl max-w-xs w-full text-slate-800 text-left animate-fade-in"
                  >
                    <h4 className="font-display font-bold text-xs mb-3 border-b pb-1.5 text-left font-sans">Add Inventory SKU</h4>
                    <form onSubmit={handleCreateInventory} className="space-y-2.5">
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Product Name</label>
                        <input 
                          type="text" required placeholder="e.g. Aloe Vera Shampoo" value={newInvName}
                          onChange={(e) => setNewInvName(e.target.value)}
                          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">SKU Code</label>
                          <input 
                            type="text" required placeholder="INV-SHMP-03" value={newInvSku}
                            onChange={(e) => setNewInvSku(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Initial Stock</label>
                          <input 
                            type="number" required placeholder="15" value={newInvStock}
                            onChange={(e) => setNewInvStock(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Safety Limit (Reorder Alert)</label>
                        <input 
                          type="number" required placeholder="5" value={newInvReorder}
                          onChange={(e) => setNewInvReorder(e.target.value)}
                          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                        />
                      </div>
                      <div className="flex gap-2 justify-end pt-2 font-sans">
                        <button type="button" onClick={() => setIsAddingInventory(false)} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-550 rounded text-[9px] font-bold cursor-pointer font-sans">Cancel</button>
                        <button type="submit" className="px-2.5 py-1.5 bg-[#006a61] text-white rounded text-[9px] font-bold cursor-pointer font-sans">Add</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* EXPENSE ADD DIALOG MODAL */}
            <AnimatePresence>
              {isAddingExpense && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 z-40 flex items-center justify-center p-4 backdrop-blur-xs font-sans"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 15 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xl max-w-xs w-full text-slate-800 text-left"
                  >
                    <h4 className="font-display font-bold text-xs mb-3 border-b pb-1.5 text-left font-sans">Record Operating Cost</h4>
                    <form onSubmit={handleCreateExpense} className="space-y-2.5">
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Expense Description</label>
                        <input 
                          type="text" required placeholder="e.g. Electricity Bill June" value={newExpTitle}
                          onChange={(e) => setNewExpTitle(e.target.value)}
                          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#ba1a1a] bg-slate-50 font-sans"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 font-sans">
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Amount (₹)</label>
                          <input 
                            type="number" required placeholder="2500" value={newExpAmount}
                            onChange={(e) => setNewExpAmount(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#ba1a1a] bg-slate-50 font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Category</label>
                          <select
                            value={newExpCategory}
                            onChange={(e) => setNewExpCategory(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#ba1a1a] bg-slate-50 font-sans"
                          >
                            <option value="Rent">Rent</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Pantry">Pantry</option>
                            <option value="Maintenance">Maintenance</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end pt-2 font-sans">
                        <button type="button" onClick={() => setIsAddingExpense(false)} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded text-[9px] font-bold cursor-pointer font-sans">Cancel</button>
                        <button type="submit" className="px-2.5 py-1.5 bg-[#ba1a1a] text-white rounded text-[9px] font-bold cursor-pointer font-sans font-sans">Log Expense</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAFF ONBOARD DIALOG MODAL */}
            <AnimatePresence>
              {isAddingStaff && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/40 z-40 flex items-center justify-center p-4 backdrop-blur-xs font-sans"
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 15 }}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xl max-w-xs w-full text-slate-800 text-left"
                  >
                    <h4 className="font-display font-bold text-xs mb-3 border-b pb-1.5 text-left font-sans">Onboard Store Employee</h4>
                    <form onSubmit={handleCreateStaff} className="space-y-2.5">
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1">Employee Name</label>
                        <input 
                          type="text" required placeholder="e.g. David Miller" value={newStaffName}
                          onChange={(e) => setNewStaffName(e.target.value)}
                          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1 font-sans">Emp Code</label>
                          <input 
                            type="text" required placeholder="e.g. SB-105" value={newStaffCode}
                            onChange={(e) => setNewStaffCode(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                          />
                        </div>
                        <div>
                          <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1 font-sans">Phone Contact</label>
                          <input 
                            type="text" required placeholder="9876543210" value={newStaffPhone}
                            onChange={(e) => setNewStaffPhone(e.target.value)}
                            className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[8px] font-bold text-slate-400 uppercase block mb-1 font-sans">Assign Role</label>
                        <select
                          value={newStaffRole}
                          onChange={(e) => setNewStaffRole(e.target.value as any)}
                          className="w-full border border-slate-200 rounded px-2.5 py-1.5 text-[10px] outline-none focus:border-[#006a61] bg-slate-50 font-sans"
                        >
                          <option value="Manager">Manager</option>
                          <option value="Specialist">Specialist</option>
                          <option value="Technician">Technician</option>
                          <option value="Cashier">Cashier</option>
                        </select>
                      </div>
                      <div className="flex gap-2 justify-end pt-2 font-sans">
                        <button type="button" onClick={() => setIsAddingStaff(false)} className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded text-[9px] font-bold cursor-pointer font-sans">Cancel</button>
                        <button type="submit" className="px-2.5 py-1.5 bg-[#006a61] text-white rounded text-[9px] font-bold cursor-pointer font-sans">Register</button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* INVOICE HISTORY RECORD MODAL DETAIL */}
            <AnimatePresence>
              {selectedInvoiceForModal && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-slate-900/40 z-40 flex items-center justify-center p-4 backdrop-blur-xs font-sans"
                  onClick={() => setSelectedInvoiceForModal(null)}
                >
                  <motion.div 
                    initial={{ scale: 0.9, y: 15 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 15 }}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xl max-w-sm w-full text-slate-850 text-left relative flex flex-col justify-between"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center border-b pb-2 mb-3 text-left font-sans">
                      <span className="text-xs font-bold text-slate-855">Invoice Record: {selectedInvoiceForModal.billNumber}</span>
                      <button onClick={() => setSelectedInvoiceForModal(null)} className="text-slate-400 hover:text-slate-700 font-bold text-xs cursor-pointer">Close</button>
                    </div>
                    <div className="bg-slate-50 border p-4 rounded-lg font-mono text-[9px] leading-relaxed text-slate-850 space-y-2 shadow-inner text-left">
                      <div className="text-center font-bold border-b border-dashed pb-1.5">
                        <span className="text-xs font-display block uppercase">{businessName}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>INV: {selectedInvoiceForModal.billNumber}</span>
                        <span>{new Date(selectedInvoiceForModal.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="border-y border-dashed py-1.5 my-1 space-y-1">
                        {selectedInvoiceForModal.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{item.qty}x {item.name}</span>
                            <span>₹{item.price * item.qty}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-right space-y-0.5">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>₹{selectedInvoiceForModal.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>Discount:</span>
                          <span>-₹{selectedInvoiceForModal.discountAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST ({taxRate}%):</span>
                          <span>₹{selectedInvoiceForModal.taxAmount}</span>
                        </div>
                        <div className="flex justify-between font-black text-black border-t border-dashed pt-1 mt-1 text-[10px]">
                          <span>TOTAL PAID:</span>
                          <span>₹{selectedInvoiceForModal.totalAmount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-4 mt-1 font-sans">
                      <button 
                        onClick={() => {
                          setLatestPrintedBill(selectedInvoiceForModal);
                          setWebhookStatus('delivered');
                          setSelectedInvoiceForModal(null);
                        }}
                        className="w-full bg-[#006a61] hover:bg-[#004d47] text-white py-2 rounded font-bold text-[10px] flex items-center justify-center gap-1.5 cursor-pointer shadow"
                      >
                        <Printer size={12} /> Send to BT Printer
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* QUICK INTRO BLOCK */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left">
          <span className="px-3 py-1 rounded-full bg-[#006a61]/10 border border-[#006a61]/20 text-[#006a61] text-xs font-bold uppercase tracking-widest">
            Cloud Synchronized
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl text-slate-900 leading-[1.1]">
            Unify Your Branches in Real-Time
          </h2>
          <p className="text-slate-655 text-sm md:text-base leading-relaxed font-sans">
            Whether you run a single retail register or a multi-city franchise catalog, BillCom synchronizes cashier checkout sessions, employee registers, overhead expense logs, and warehouse stock thresholds instantly.
          </p>
          <div className="flex gap-4">
            <a 
              href="#features" 
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs transition-colors"
            >
              Explore Modules
            </a>
            <a 
              href="#demo" 
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors border border-slate-200"
            >
              Open Sandbox
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-sm glass-card rounded-2xl border border-slate-200 p-6 bg-white space-y-4 shadow-md text-slate-800 text-left font-sans">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-mono">
                <LayoutDashboard size={14} className="text-[#006a61]" />
                Daily Sales Ledger
              </span>
              <span className="text-[8px] font-bold text-[#006a61] bg-[#006a61]/10 px-2 py-0.5 rounded-full">HQ Active</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50 text-left">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Gross Revenue</span>
                <div className="text-xs font-extrabold text-slate-800 font-mono mt-0.5">₹34,850</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/50 text-left">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Invoices Paid</span>
                <div className="text-xs font-extrabold text-slate-800 font-mono mt-0.5">18 Sales</div>
              </div>
            </div>
            <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center justify-between text-xs font-semibold text-emerald-800">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-[#006a61]" />
                Ledger Synced
              </span>
              <span className="font-mono text-[9px] font-bold">100% OK</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* COMING SOON ROADMAP SECTION */}
      {/* ---------------------------------------------------- */}
      <section id="roadmap" className="space-y-12">
        <div className="text-center space-y-4">
          <span className="px-3 py-1 rounded-full bg-[#006a61]/10 border border-[#006a61]/20 text-[#006a61] text-xs font-bold uppercase tracking-widest">
            Future Updates
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900">
            Coming Soon to BillCom
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base font-medium">
            We are actively designing advanced modules to synchronize your register outlets and automate backend ledger reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "SaaS Cloud Analytics Dashboard",
              desc: "Consolidated sales performance, branch revenues, peak hours, and product catalog audits in real time.",
              status: "Q3 2026 - In Development"
            },
            {
              title: "Multi-Register Cloud Sync",
              desc: "Seamless offline register databases syncing item catalogs, discounts, and staff shifts automatically.",
              status: "Q4 2026 - Research Phase"
            },
            {
              title: "Integrated Accounting & Ledgers",
              desc: "Auto-export transactions, GST liabilities, and daily expenses directly into popular tax filing platforms.",
              status: "Q1 2027 - Planned"
            }
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-3xl border border-slate-200 p-8 flex flex-col justify-between bg-white shadow-sm relative overflow-hidden text-left hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#006a61] bg-[#006a61]/10 px-2 py-0.5 rounded-full font-sans">
                    {item.status}
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed font-sans">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEEDBACK PORTAL SECTION */}
      <section className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-lg text-left space-y-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[#006a61]/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#006a61]/10 border border-[#006a61]/20 text-[#006a61] text-xs font-bold uppercase tracking-widest">
            Feedback Portal
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900">
            Share Your Experience
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-medium">
            We are actively refining our checkout latency. Let us know how we can make our dashboard smarter.
          </p>
        </div>

        {feedbackSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={20} />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Thank You for Your Feedback!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your notes have been recorded in our development logs.
            </p>
            <button 
              onClick={() => setFeedbackSuccess(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-650 text-xs font-bold rounded-xl border cursor-pointer font-sans"
            >
              Submit another feedback
            </button>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="space-y-4 relative z-10">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase block">Overall Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFeedbackRating(star)}
                    className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star 
                      size={22} 
                      fill={star <= feedbackRating ? "#fbbf24" : "none"} 
                      stroke="#fbbf24" 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase block">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={feedbackEmail}
                onChange={(e) => setFeedbackEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#006a61] bg-slate-50 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase block">Your Comments &amp; Suggestions</label>
              <textarea
                rows={3}
                required
                placeholder="What features or integrations would you like to see next?"
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#006a61] bg-slate-50 resize-none font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isFeedbackSubmitting}
              className="w-full py-3 bg-[#006a61] text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 hover:bg-[#004d47] transition-all cursor-pointer shadow rounded-xl font-sans"
            >
              {isFeedbackSubmitting ? (
                <>
                  <RefreshCw size={12} className="animate-spin" />
                  <span>Submitting feedback...</span>
                </>
              ) : (
                <span>Submit Feedback</span>
              )}
            </button>
          </form>
        )}
      </section>

      {/* BOTTOM FINAL CALL TO ACTION */}
      <section className="text-center py-16 px-4 relative rounded-3xl overflow-hidden border border-slate-200 glass-card bg-white shadow-xl">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 w-[80%] h-[150%] bg-[#006a61]/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="font-display font-black text-3xl md:text-5xl text-slate-800 tracking-tight">
            Ready to Upgrade Your Invoicing?
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-lg mx-auto font-sans">
            Launch the cloud dashboard terminal or sign up with mock credentials to test active cashier sessions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="http://localhost:3000/login" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#006a61] text-white font-extrabold text-base hover:bg-[#004d47] hover:shadow-[0_4px_15px_rgba(0,106,97,0.3)] transition-all transform hover:scale-[1.03] flex items-center justify-center gap-2 font-sans"
            >
              Launch Cloud Dashboard
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
