const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// تهيئة البوت والحفاظ على تسجيل الدخول
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] } // عشان يشتغل على السيرفرات المجانية بدون مشاكل
});

// إظهار الـ QR Code في التيرمنال لعمل سكان
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('قم بعمل سكان للرمز التالي برقم واتساب الأعمال:');
});

// لما البوت يشتغل بنجاح
client.on('ready', () => {
    console.log('بوت الحمزاوي جاهز للرد التلقائي! 🚀');
});

// الاستماع للرسائل الواردة
client.on('message', async msg => {
    const chat = await msg.getChat();
    // البوت يشتغل فقط مع الشات الفردي مش الجروبات
    if (chat.isGroup) return;

    const userMessage = msg.body.trim();

    // 1. رسالة الترحيب والـ Main Menu
    if (userMessage.toLowerCase() === 'سلام' || userMessage === 'سلام عليكم' || userMessage === 'هلا' || userMessage === 'بدء') {
        const welcomeText = `مرحباً بكِ في *Al-Hamzawi | الحمزاوي* ✨🛍️\n\n` +
                            `وجهتك الكاملة لأحدث صيحات الملابس وأجود مستحضرات التجميل.\n\n` +
                            `من فضلك اختر رقم القسم للاستفسار:\n` +
                            `*1* - أحدث تشكيلات الملابس 👔\n` +
                            `*2* - مستحضرات التجميل والعناية 💄\n` +
                            `*3* - لطلب أوردر مباشر مع المودريتور 📦`;
        await client.sendMessage(msg.from, welcomeText);
    } 
    
    // 2. رد قسم الملابس
    else if (userMessage === '1') {
        const clothesText = `*قسم الملابس من الحمزاوي 👔*\n\n` +
                            `بنوفر لك كوليكشن صيفي متميز (أوفر سايز، كاجوال، بناطيل باجي..).\n\n` +
                            `👉 تقدر تتصفح الصور والأسعار مباشرة من *كتالوج الواتساب* الخاص بنا.\n` +
                            `بعد ما تختار، ابعت لنا صورة الموديل والمقاس هنا وهيتم التجهيز فوراً!`;
        await client.sendMessage(msg.from, clothesText);
    } 
    
    // 3. رد قسم مستحضرات التجميل
    else if (userMessage === '2') {
        const beautyText = `*قسم مستحضرات التجميل والعناية 💄*\n\n` +
                           `كل المنتجات أصلية وآمنة 100% على البشرة.\n\n` +
                           `🔥 *الأكثر مبيعاً حالياً:* كريم DOVO الطبيعي لشد ورفع المناطق الأنثوية وإعطائها مظهر متناسق (متوفر الآن بخصم لفترة محدودة).\n\n` +
                           `اكتب *طلب* لتسجيل أوردر، أو تصفح الكتالوج لمعرفة باقي المنتجات.`;
        await client.sendMessage(msg.from, beautyText);
    } 
    
    // 4. طلب أوردر مباشر
    else if (userMessage === '3' || userMessage === 'طلب') {
        const orderText = `*لتسجيل أوردر سريع 📦*\n\n` +
                          `من فضلك سيب البيانات دي في رسالة واحدة:\n` +
                          `- الاسم الثنائي:\n` +
                          `- رقم التليفون:\n` +
                          `- العنوان بالتفصيل (المحافظة والمنطقة):\n` +
                          `- المنتجات المطلوبة ومقاساتها:\n\n` +
                          `المودريتور هيراجع البيانات ويثبت الأوردر معاك أول ما يفتح! ✨`;
        await client.sendMessage(msg.from, orderText);
    }
});

client.initialize();
