import typhoon from "../../../assets/images/typhoon.webp";
import eq from "../../../assets/images/earthquake.webp";
import vol from "../../../assets/images/volcano.webp";


const guides = {
  volcanicEruption: {
    image: vol,
    before: {
      title: "Before a Volcanic Eruption",
      contents: [
        "Prepare an Emergency Kit: Include water, non-perishable food, flashlight, extra batteries, first-aid supplies, goggles, dust masks, important documents, and essential medications.",
        "Know Evacuation Routes: Identify the nearest evacuation centers and safest routes to get there. Practice routes with family members.",
        "Create a Family Communication Plan: Set up emergency contacts and meeting points.",
        "Prepare Your Home: Clear gutters and cover vents to minimize ash infiltration. Keep doors and windows closed.",
        "Protect Livestock and Pets: Make plans to shelter animals or move them to safer areas.",
        "Monitor Alerts and Warnings: Regularly check for updates from local authorities and emergency services.",
        "Store Additional Supplies: Stock up on plastic sheeting, duct tape, and extra water, as volcanic ash can contaminate supplies.",
      ],
    },
    during: {
      title: "During a Volcanic Eruption",
      contents: [
        "Evacuate if Advised: Follow official evacuation orders immediately, and take your emergency kit.",
        "Protect Yourself from Ash: Wear long-sleeved clothing, goggles, and a mask to protect your skin, eyes, and respiratory system from ash.",
        "Stay Indoors: If evacuation is not required, stay inside with doors and windows closed. Seal cracks with duct tape and use wet towels to block vents if needed.",
        "Avoid Driving: Ash can reduce visibility, damage engines, and make roads slippery, so avoid driving unless necessary.",
        "Stay Updated on Alerts: Keep a battery-powered radio or smartphone handy for emergency updates and instructions from local authorities.",
      ],
    },
    after: {
      title: "After a Volcanic Eruption",
      contents: [
        "Wait for Official Clearance: Only return to your home or venture outside when authorities have deemed it safe.",
        "Avoid Ash and Hazardous Areas: Be cautious of ash-covered roads, which can be slippery and harmful to vehicles.",
        "Wear Protective Gear: Continue to wear masks and goggles when cleaning up ash, as it can irritate the lungs, eyes, and skin.",
        "Clear Ash Safely: Remove ash from roofs, driveways, and gutters to prevent structural damage. Use damp cloths or water to minimize dust when cleaning.",
        "Document Property Damage: Take photos of any damage for insurance purposes and keep a record.",
        "Inspect Utilities and Infrastructure: Check for gas leaks, electrical issues, and other hazards before fully returning to your home.",
        "Support Livestock and Pets: Make sure animals have access to clean food and water, as ash may have contaminated outdoor sources.",
        "Stay Updated on Further Risks: Continue to monitor for potential after-effects like landslides or secondary eruptions.",
      ],
    },
  },
  earthquake: {
    image: eq,
    before: {
      title: "Before an Earthquake",
      contents: [
        "Prepare an Emergency Kit: Include water, non-perishable food, flashlight, batteries, first-aid supplies, essential medications, and important documents.",
        "Secure Heavy Objects: Anchor bookshelves, mirrors, TVs, and other heavy items to walls to prevent them from falling.",
        "Identify Safe Spots: Know the safest areas in each room, such as under sturdy furniture or against an interior wall, away from windows and heavy objects.",
        "Create a Family Communication Plan: Establish meeting points and emergency contacts.",
        "Practice Earthquake Drills: Ensure all family members know “Drop, Cover, and Hold On.”",
        "Learn How to Shut Off Utilities: Familiarize yourself with turning off gas, water, and electricity in case of leaks or hazards.",
        "Check Home Structure: Have a professional inspect your home for any vulnerabilities, especially if it’s in an earthquake-prone area.",
      ],
    },
    during: {
      title: "During an Earthquake",
      contents: [
        "Drop, Cover, and Hold On: Get under sturdy furniture, cover your head and neck, and hold on until the shaking stops.",
        "Stay Indoors: Avoid running outside during shaking as falling debris poses a major risk.",
        "Move Away from Windows: Glass can shatter, so stay clear of windows and anything that could break or fall.",
        "If Outdoors, Move to an Open Area: Get away from buildings, trees, power lines, and other potential hazards.",
        "If in a Car, Stop Safely: Pull over and stop, avoiding bridges, overpasses, and power lines. Stay in the vehicle until the shaking stops.",
      ],
    },
    after: {
      title: "After an Earthquake",
      contents: [
        "Check for Injuries: Tend to injuries and use your first-aid kit if needed; avoid moving severely injured individuals unless necessary.",
        "Inspect for Hazards: Check for gas leaks, structural damage, and electrical issues. Turn off utilities if you detect hazards.",
        "Monitor Emergency Alerts: Stay updated on aftershocks, which can follow major earthquakes.",
        "Document Property Damage: Take photos for insurance purposes and keep a record of damaged property.",
        "Avoid Damaged Buildings: Do not re-enter heavily damaged buildings until authorities have inspected them.",
        "Stay Away from Coastal Areas: If near the coast, move to higher ground in case of a potential tsunami.",
        "Prepare for Aftershocks: Be ready to “Drop, Cover, and Hold On” as aftershocks are common after a significant quake.",
        "Help Neighbors if Possible: Assist those who may need help, especially children, the elderly, and those with disabilities.",
        "Stay Informed on Further Risks: Continue to monitor news and official updates for secondary risks like landslides.",
      ],
    },
  },
  typhoon: {
    image: typhoon,
    before: {
      title: "Before a Typhoon",
      contents: [
        "Prepare an Emergency Kit: Include water, non-perishable food, flashlight, batteries, first-aid supplies, important documents, and any essential medications.",
        "Secure Your Home: Reinforce doors and windows, trim tree branches, and bring loose outdoor items (e.g., furniture, bikes) inside to prevent them from becoming projectiles.",
        "Create a Family Communication Plan: Decide on safe meeting points and ensure everyone knows emergency contact numbers.",
        "Check Weather Updates: Regularly monitor reliable sources (e.g., government agencies, weather websites) for typhoon updates.",
        "Know Your Evacuation Route: Identify the nearest evacuation center and plan the safest route to get there.",
        "Charge Electronics and Power Banks: Ensure mobile devices are fully charged to stay connected.",
        "Turn Off Utilities (if advised): Be ready to shut off water, gas, and electricity if authorities instruct you to do so.",
      ],
    },
    during: {
      title: "During a Typhoon",
      contents: [
        "Stay Indoors: Avoid going outside unless necessary, as strong winds and debris can be dangerous.",
        "Avoid Windows: Keep away from glass doors and windows to avoid injury from broken glass.",
        "Monitor Emergency Alerts: Keep a battery-operated radio or smartphone for updates from local authorities.",
        "Unplug Electronics: Disconnect non-essential electrical devices to prevent damage from power surges.",
        "Move to Higher Ground (if needed): If you are in a flood-prone area and it is safe to do so, move to a higher level of your home.",
        "Stay Calm and Informed: Focus on safety and follow any official instructions closely.",
      ],
    },
    after: {
      title: "After a Typhoon",
      contents: [
        "Wait for Official Clearance: Only leave your shelter or return home when local authorities say it is safe.",
        "Check for Hazards: Watch for downed power lines, flooded areas, and other dangers before moving around outside.",
        "Document Property Damage: Take photos of any damage for insurance purposes and for records.",
        "Avoid Floodwaters: Floodwater may be contaminated or have hidden dangers, so avoid walking or driving through it.",
        "Inspect Your Home Carefully: Check for structural damage, gas leaks, and water damage before re-entering your home.",
        "Seek Help if Needed: Contact emergency services for urgent assistance and reach out to relief organizations if you need support.",
        "Stay Updated on Weather Conditions: Monitor for secondary hazards like landslides or additional storms.",
        "Sanitize and Clean: Properly clean and disinfect surfaces that may have been contaminated by floodwaters.",
      ],
    },
  },
};

export default guides;
