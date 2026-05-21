export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method === 'POST') {
        try {
            const data = req.body;
            
            // Log to console (Vercel logs mein dikhega)
            console.log('='.repeat(50));
            console.log('📍 NEW VISITOR TRACKED');
            console.log('='.repeat(50));
            console.log(`🆔 ID: ${data.id}`);
            console.log(`👤 Name: ${data.name}`);
            console.log(`📍 Location: ${data.location?.lat}, ${data.location?.lon}`);
            console.log(`🌐 IP: ${data.network?.ip}`);
            console.log(`🏙️ City: ${data.network?.city}`);
            console.log(`📱 Device: ${data.device?.platform}`);
            console.log(`🕐 Time: ${data.timestamp}`);
            console.log('='.repeat(50));
            
            // Store in memory (Vercel temporary)
            if (!global.trackingData) {
                global.trackingData = [];
            }
            global.trackingData.push(data);
            
            return res.status(200).json({ 
                success: true, 
                message: 'Data received',
                total: global.trackingData.length 
            });
            
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
    }
    
    if (req.method === 'GET') {
        // Get all tracking data
        return res.status(200).json({ 
            success: true, 
            data: global.trackingData || [],
            total: global.trackingData?.length || 0
        });
    }
    
    return res.status(405).json({ success: false, error: 'Method not allowed' });
}
