export async function POST(req) {
    try {
      const body = await req.json();
      console.log("Personal Details:", body); // Replace this with database storage logic
      return new Response(JSON.stringify({ success: true, message: "Personal details saved." }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: "Failed to save personal details." }), { status: 500 });
    }
  }