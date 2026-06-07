import { useState, useEffect } from "react";
import { PDFDocument } from 'pdf-lib';

// ===================== DATA =====================

const JOBS = [
  {
    id: 28, title: "SSC Delhi Police Head Constable Ministerial Recruitment 2025", category: "Police", date: "05 Jun 2026", lastDate: "20/10/2025", posts: "509", isNew: true, isHot: true, url: "#",
    details: {
      postDate: "05 June 2026",
      shortInfo: "Staff Selection Commission (SSC) has released the notification for Delhi Police Head Constable Ministerial Examination 2025. Those Candidate Are Enrolled with Vacancy Can Check the Result. Before applying, candidates must read the complete advertisement in which selection procedure, exam syllabus, pattern, exam date and other information will be available.",
      importantDates: [
        { label: "Application Begin", date: "29/09/2025" },
        { label: "Last Date for Apply Online", date: "20/10/2025" },
        { label: "Last Date Pay Exam Fee", date: "21/10/2025" },
        { label: "Correction Date", date: "27-29 October 2025" },
        { label: "Exam Date", date: "07-12 January 2026" },
        { label: "Result Available", date: "05/06/2026" },
      ],
      applicationFee: [
        { category: "General / OBC / EWS", fee: "100/-" },
        { category: "SC / ST", fee: "0/-" },
        { category: "All Category Female", fee: "0/-" },
      ],
      ageLimit: { min: "18 Years", max: "25 Years", asOn: "01/07/2025" },
      totalPosts: "509",
      eligibility: [
        "10+2 Intermediate Exam from Any Recognized Board in India.",
        "English Typing Speed : 30 WPM OR",
        "Hindi Typing Speed : 25 WPM",
        "More Eligibility Details Read the Notification."
      ],
      petDetails: [
        "Racing : Male 1600 Meter in 07 Minutes & Female 800 Meter in 05 Minutes",
        "Long Jump : Male 12 Feet 6 Inch & Female 9 Feet",
        "High Jump : Male 3 Feet 6 Inch & Female 3 Feet",
        "Chest : Male 78-82 CMS"
      ],
      categoryVacancy: [
        { post: "DP Head Constable Ministerial Male", gen: 168, ews: 34, obc: 77, sc: 49, st: 13, total: 341 },
        { post: "DP Head Constable Ministerial Female", gen: 82, ews: 17, obc: 38, sc: 27, st: 7, total: 168 },
      ],
      howToFill: [
        "SSC Delhi Police Head Constable Ministerial Recruitment for Various Post Candidate Can Apply Between 29/09/2025 to 20/10/2025",
        "Candidate Read the Notification Before Apply the Recruitment Application Form in SSC Delhi Police Head Constable Ministerial Recruitment 2025.",
        "Kindly Check and Collect the All Document – Eligibility, ID Proof, Address Details, Basic Details.",
        "Kindly Ready Scan Document Related to Recruitment Form – Photo, Sign, ID Proof, Etc.",
        "Before Submit the Application Form Must Check the Preview and All Column Carefully.",
        "If Candidate Required to Paying the Application Fee Must Submit. If You have Not the Required Application Fees Your Form is Not Completed.",
        "Take A Print Out of Final Submitted Form."
      ],
      usefulLinks: [
        { label: "Download Result", url: "#" },
        { label: "Download Cutoff", url: "#" },
        { label: "Apply Online", url: "https://ssc.gov.in/" },
        { label: "Download Notification", url: "#" },
        { label: "Official Website", url: "https://delhipolice.gov.in/" },
      ]
    }
  },
  { id:1,  title:"RRB ALP Recruitment 2026 (CEN 01/2026)",      category:"Railway",   date:"15 May 2026", lastDate:"14 Jun 2026", posts:"11,127",  isNew:true,  isHot:true,  url:"https://indianrailways.gov.in/" },
  { id:2,  title:"SSC CGL 2026 Online Form",                   category:"SSC",       date:"21 May 2026", lastDate:"22 Jun 2026", posts:"12,256",  isNew:true,  isHot:true,  url:"https://ssc.gov.in/" },
  { id:3,  title:"BPSC 72nd Combined (Pre) Exam 2026",         category:"State PSC", date:"07 May 2026", lastDate:"31 May 2026", posts:"1,186",   isNew:true,  isHot:true,  url:"https://www.bpsc.bih.nic.in/" },
  { id:4,  title:"Bihar Police Constable (Special Branch) 2026", category:"Police",    date:"06 Feb 2026", lastDate:"05 Mar 2026", posts:"83",      isNew:true,  isHot:false, url:"https://csbc.bih.nic.in/" },
  { id:5,  title:"SBI PO Recruitment 2026",                    category:"Bank",      date:"18 May 2026", lastDate:"15 Jun 2026", posts:"2,500",   isNew:true,  isHot:true,  url:"https://sbi.co.in/web/careers" },
  { id:6,  title:"UGC NET June 2026 Application Form",           category:"Teaching",  date:"11 May 2026", lastDate:"05 Jun 2026", posts:"Various", isNew:false, isHot:true,  url:"https://ugcnet.nta.nic.in/" },
  { id:7,  title:"BPSC Assistant Engineer (AE) Recruitment 2025", category:"State PSC", date:"29 Apr 2025", lastDate:"27 May 2025", posts:"1,024",   isNew:false, isHot:false, url:"https://www.bpsc.bih.nic.in/" },
  { id:8,  title:"Bihar Lekhpal IT Sahayak Recruitment 2026",    category:"State PSC", date:"10 May 2026", lastDate:"09 Jun 2026", posts:"6,570",   isNew:false, isHot:true,  url:"https://bceceboard.bihar.gov.in/" },
  { id:9,  title:"Indian Navy SSC Executive IT Recruitment 2026", category:"Defence",   date:"15 May 2026", lastDate:"10 Jun 2026", posts:"15",      isNew:false, isHot:false, url:"https://www.joinindiannavy.gov.in/" },
  { id:10, title:"UPSSSC Lekhpal Online Form 2026",            category:"State PSC", date:"29 Dec 2025", lastDate:"28 Jan 2026", posts:"7,994",   isNew:false, isHot:false, url:"http://upsssc.gov.in/" },
  { id:11, title:"SSC GD Constable Recruitment 2026",          category:"SSC",       date:"01 Dec 2025", lastDate:"31 Dec 2025", posts:"25,487",  isNew:false, isHot:true,  url:"https://ssc.gov.in/" },
  { id:12, title:"IBPS Clerk Recruitment 2026",                category:"Bank",      date:"01 Jun 2026", lastDate:"21 Jun 2026", posts:"7,500",   isNew:true,  isHot:false, url:"https://www.ibps.in/" },
  { id:13, title:"UPSC Civil Services (IAS/IFS) Pre 2026",     category:"UPSC",      date:"12 Feb 2026", lastDate:"05 Mar 2026", posts:"1,255",   isNew:false, isHot:true,  url:"https://upsconline.nic.in/" },
  { id:14, title:"Bihar STET 2026 Application Form",           category:"Teaching",  date:"14 May 2026", lastDate:"02 Jun 2026", posts:"Various", isNew:false, isHot:false, url:"https://bsebstet.com/" },
  { id:15, title:"CRPF Constable Tradesman Recruitment 2026",    category:"Police",    date:"27 Apr 2026", lastDate:"25 May 2026", posts:"9,195",   isNew:false, isHot:false, url:"https://crpf.gov.in/" },
  { id:16, title:"NTA NEET UG 2026 Re-Exam",                   category:"Medical",   date:"01 Jun 2026", lastDate:"15 Jun 2026", posts:"Various", isNew:true,  isHot:true,  url:"https://exams.nta.ac.in/NEET/" },
  { id:17, title:"Allahabad High Court RO/ARO Recruitment",      category:"State PSC", date:"15 May 2026", lastDate:"21 Jun 2026", posts:"543",     isNew:false, isHot:false, url:"https://www.allahabadhighcourt.in/" },
  { id:18, title:"Indian Army Agniveer Rally 2026",            category:"Defence",   date:"08 May 2026", lastDate:"21 Jun 2026", posts:"Various", isNew:false, isHot:false, url:"https://joinindianarmy.nic.in/" },
  { id:19, title:"BPSC AEDO Recruitment 2025",                 category:"State PSC", date:"05 Dec 2025", lastDate:"12 Dec 2025", posts:"935",     isNew:false, isHot:false, url:"https://www.bpsc.bih.nic.in/" },
  { id:20, title:"Coal India CIL Management Trainee MT",       category:"Engineering", date:"10 May 2026", lastDate:"02 Jun 2026", posts:"1,100",   isNew:false, isHot:false, url:"https://www.coalindia.in/" },
  { id:21, title:"NCL Apprentice Recruitment 2026",            category:"Railway",   date:"25 May 2026", lastDate:"15 Jun 2026", posts:"1,607",   isNew:false, isHot:false, url:"http://nclcil.in/" },
  { id:22, title:"IBPS RRB XII Online Form 2026",              category:"Bank",      date:"01 Jun 2026", lastDate:"21 Jun 2026", posts:"8,500",   isNew:true,  isHot:true,  url:"https://www.ibps.in/" },
  { id:23, title:"CTET September 2026 Online Form",            category:"Teaching",  date:"18 May 2026", lastDate:"15 Jun 2026", posts:"Various", isNew:false, isHot:true,  url:"https://ctet.nic.in/" },
  { id:24, title:"UP Police Constable Recruitment 2026",       category:"Police",    date:"01 Jun 2026", lastDate:"30 Jun 2026", posts:"52,699",  isNew:true,  isHot:true,  url:"https://uppbpb.gov.in/" },
  { id:25, title:"DSSSB Various Posts Online Form 2026",       category:"Delhi",     date:"30 Apr 2026", lastDate:"25 May 2026", posts:"8,121",   isNew:false, isHot:false, url:"https://dsssb.delhi.gov.in/" },
  { id:26, title:"Bihar Jeevika Vacancy 2026",                 category:"State PSC", date:"25 May 2026", lastDate:"20 Jun 2026", posts:"140",     isNew:true,  isHot:false, url:"https://brlps.in/career/Default.aspx" },
  { id:27, title:"BPSC Stenographer Vacancy 2026",             category:"State PSC", date:"28 May 2026", lastDate:"25 Jun 2026", posts:"15",      isNew:true,  isHot:false, url:"https://www.bpsc.bih.nic.in/" },
];

const RESULTS = [
  { id:1,  title:"SSC CGL 2025 Final Result",                                      category:"SSC",       date:"14 May 2026", isNew:true,  url:"https://ssc.gov.in/portal/results" },
  { id:2,  title:"BPSC AE Result 2025",                                            category:"State PSC", date:"07 Aug 2025", isNew:true,  url:"https://www.bpsc.bih.nic.in/" },
  { id:3,  title:"UPSC NDA I 2026 Result",                                         category:"UPSC",      date:"21 May 2026", isNew:true,  url:"https://upsc.gov.in/examinations/written-results" },
  { id:4,  title:"RRB Technician Grade I Result 2025",                             category:"Railway",   date:"20 May 2026", isNew:false, url:"https://indianrailways.gov.in/" },
  { id:5,  title:"CBSE Board Class 12th Result 2026",                              category:"Boards",    date:"19 May 2026", isNew:false, url:"https://www.cbse.gov.in/results.html" },
  { id:6,  title:"Bihar Board 10th Result 2026",                                   category:"Boards",    date:"31 Mar 2026", isNew:false, url:"http://biharboardonline.bihar.gov.in/" },
  { id:7,  title:"UP Board Class 10th & 12th Result 2026",                         category:"Boards",    date:"25 Apr 2026", isNew:false, url:"https://upmsp.edu.in/" },
  { id:8,  title:"India Post GDS 3rd Merit List 2026",                             category:"Post",      date:"17 May 2026", isNew:false, url:"https://indiapostgdsonline.gov.in/" },
  { id:9,  title:"UPSC IFS 2025 Final Result with Marks",                          category:"UPSC",      date:"16 May 2026", isNew:false, url:"https://upsc.gov.in/examinations/written-results" },
  { id:10, title:"NTA NTET Result 2026",                                           category:"Teaching",  date:"15 May 2026", isNew:false, url:"https://ugcnet.nta.nic.in/" },
  { id:11, title:"IDBI Bank JAM Final Result 2026",                                category:"Bank",      date:"14 May 2026", isNew:false, url:"https://www.idbibank.in/careers.aspx" },
  { id:12, title:"UPSC CDS I Result 2026",                                         category:"UPSC",      date:"13 May 2026", isNew:false, url:"https://upsc.gov.in/examinations/written-results" },
  { id:13, title:"Bihar BPSC 70th Mains Result 2026",                              category:"State PSC", date:"07 May 2026", isNew:false, url:"https://www.bpsc.bih.nic.in/" },
  { id:14, title:"SSC MTS & Havaldar 2024 Final Result",                           category:"SSC",       date:"05 May 2026", isNew:false, url:"https://ssc.gov.in/portal/results" },
  { id:15, title:"IBPS PO/MT XIII Final Result 2025",                              category:"Bank",      date:"01 Apr 2025", isNew:false, url:"https://www.ibps.in/" },
];

const ADMIT_CARDS = [
  { id:1,  title:"Bihar Police Special Branch Constable Admit Card",               category:"Police",    date:"04 Jun 2026", examDate:"24 Jun 2026", isNew:true,  url:"https://csbc.bih.nic.in/" },
  { id:2,  title:"BPSC 72nd CCE Prelims Admit Card 2026",                          category:"State PSC", date:"15 Jul 2026", examDate:"26 Jul 2026", isNew:true,  url:"https://www.bpsc.bih.nic.in/" },
  { id:3,  title:"SSC CGL 2026 Tier 1 Admit Card",                                 category:"SSC",       date:"20 Jul 2026", examDate:"Aug 2026",    isNew:true,  url:"https://ssc.gov.in/" },
  { id:4,  title:"RRB ALP CBT 1 Admit Card 2026",                                  category:"Railway",   date:"25 Jul 2026", examDate:"Aug 2026",    isNew:true,  url:"https://indianrailways.gov.in/" },
  { id:5,  title:"UPSC IAS/IFS Pre 2026 Admit Card",                               category:"UPSC",      date:"22 May 2026", examDate:"15 Jun 2026", isNew:false, url:"https://upsconline.nic.in/" },
  { id:6,  title:"BPSC AEDO Admit Card 2026",                                      category:"State PSC", date:"03 Apr 2026", examDate:"14 Apr 2026", isNew:false, url:"https://www.bpsc.bih.nic.in/" },
  { id:7,  title:"SSC GD Constable 2026 Admit Card",                               category:"SSC",       date:"10 Feb 2026", examDate:"23 Feb 2026", isNew:false, url:"https://ssc.gov.in/" },
  { id:8,  title:"IBPS RRB Clerk Admit Card 2026",                                 category:"Bank",      date:"16 May 2026", examDate:"08 Jun 2026", isNew:false, url:"https://www.ibps.in/" },
  { id:9,  title:"NDA I 2026 Written Exam Admit Card",                             category:"Defence",   date:"15 May 2026", examDate:"01 Jun 2026", isNew:false, url:"https://upsconline.nic.in/" },
  { id:10, title:"UPSSSC Lekhpal Admit Card 2026",                                 category:"State PSC", date:"15 Feb 2026", examDate:"Mar 2026",    isNew:false, url:"http://upsssc.gov.in/" },
];

const ANSWER_KEYS = [
  { id:1, title:"JEE Advanced 2026 Question Paper & Answer Key",   category:"Engineering", date:"22 May 2026", isNew:true,  url:"https://jeeadv.ac.in/" },
  { id:2, title:"UPSSSC Lekhpal Answer Key 2026",                   category:"State PSC",  date:"21 May 2026", isNew:true,  url:"http://upsssc.gov.in/" },
  { id:3, title:"DSSSB Various Post Answer Key 2026",               category:"Delhi",       date:"20 May 2026", isNew:false, url:"https://dsssb.delhi.gov.in/" },
  { id:4, title:"NCERT LDC Answer Key 2026",                        category:"Teaching",    date:"19 May 2026", isNew:false, url:"https://ncert.nic.in/" },
  { id:5, title:"MPESB Nursing Officer Answer Key 2026",            category:"Medical",     date:"18 May 2026", isNew:false, url:"https://esb.mp.gov.in/" },
  { id:6, title:"RRB JE CEN 05/2025 Answer Key",                    category:"Railway",     date:"17 May 2026", isNew:false, url:"https://indianrailways.gov.in/" },
  { id:7, title:"SSC CHSL Tier I 2025 Answer Key",                  category:"SSC",         date:"16 May 2026", isNew:false, url:"https://ssc.gov.in/" },
  { id:8, title:"UPSC IFS 2025 Final Answer Key",                   category:"UPSC",        date:"15 May 2026", isNew:false, url:"https://upsc.gov.in/" },
  { id:9, title:"IBPS PO Prelims 2026 Answer Key",                  category:"Bank",        date:"14 May 2026", isNew:false, url:"https://www.ibps.in/" },
  { id:10,title:"Bihar Police Constable 2026 Answer Key",           category:"Police",      date:"13 May 2026", isNew:false, url:"https://csbc.bih.nic.in/" },
];

const SYLLABI = [
  { id:1, title:"UPSC IAS/IFS 2026 Syllabus & Exam Pattern",      category:"UPSC",       updated:"Jan 2026", url:"https://upsc.gov.in/examinations/exam-syllabus" },
  { id:2, title:"SSC CGL 2026 Tier I & II Syllabus PDF",           category:"SSC",        updated:"Feb 2026", url:"https://ssc.gov.in/candidate-portal/syllabus" },
  { id:3, title:"RRB ALP 2026 Syllabus & CBT Pattern",             category:"Railway",    updated:"Mar 2026", url:"https://indianrailways.gov.in/" },
  { id:4, title:"IBPS PO 2026 Prelims & Mains Syllabus",           category:"Bank",       updated:"Apr 2026", url:"https://www.ibps.in/" },
  { id:5, title:"Bihar Police Constable 2026 Syllabus PDF",        category:"Police",     updated:"Apr 2026", url:"https://csbc.bih.nic.in/" },
  { id:6, title:"RPSC 1st Grade Teacher 2026 Syllabus",            category:"Teaching",   updated:"May 2026", url:"https://rpsc.rajasthan.gov.in/syllabus" },
  { id:7, title:"NDA 2026 Mathematics & GAT Syllabus",             category:"Defence",    updated:"Mar 2026", url:"https://upsc.gov.in/examinations/exam-syllabus" },
  { id:8, title:"AIIMS NORCET 2026 Nursing Syllabus",              category:"Medical",    updated:"May 2026", url:"https://www.aiimsexams.ac.in/" },
  { id:9, title:"BPSC 71st Combined Pre 2026 Syllabus",            category:"State PSC",  updated:"Apr 2026", url:"https://www.bpsc.bih.nic.in/" },
  { id:10,title:"SSC CHSL 2026 Tier I Syllabus PDF",               category:"SSC",        updated:"Mar 2026", url:"https://ssc.gov.in/candidate-portal/syllabus" },
];

const OTHER_LINKS = [
  // UIDAI (Aadhaar)
  { id: 1, title: "Download Aadhaar Card", category: "UIDAI", url: "https://myaadhaar.uidai.gov.in/genricDownloadAadhaar" },
  { id: 2, title: "Update Aadhaar Address Online", category: "UIDAI", url: "https://myaadhaar.uidai.gov.in/address-update" },
  { id: 3, title: "Check Aadhaar Update Status", category: "UIDAI", url: "https://myaadhaar.uidai.gov.in/check-aadhaar-status" },
  { id: 4, title: "Order Aadhaar PVC Card", category: "UIDAI", url: "https://myaadhaar.uidai.gov.in/genricPVC" },

  // PAN Card
  { id: 5, title: "Apply for New PAN Card (NSDL/Protean)", category: "PAN", url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
  { id: 6, title: "Apply for New PAN Card (UTIITSL)", category: "PAN", url: "https://www.pan.utiitsl.com/PAN/newA.html" },
  { id: 7, title: "Link Aadhaar with PAN", category: "PAN", url: "https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar" },
  { id: 8, title: "Check PAN Application Status", category: "PAN", url: "https://tin.tin.nsdl.com/pantan/StatusTrack.html" },

  // Parivahan
  { id: 9, title: "Pay Traffic e-Challan Online", category: "Parivahan", url: "https://echallan.parivahan.gov.in/" },
  { id: 10, title: "Driving License Services (Sarathi)", category: "Parivahan", url: "https://sarathi.parivahan.gov.in/sarathiservice/stateSelection.do" },
  { id: 11, title: "Vehicle Related Services (Vahan)", category: "Parivahan", url: "https://vahan.parivahan.gov.in/vahanservice/vahan/ui/statevalidation/homepage.xhtml" },
];

const CATEGORIES = [
  { label:"Railway",     color:"#1565c0", bg:"#e3f2fd" },
  { label:"Bank",        color:"#2e7d32", bg:"#e8f5e9" },
  { label:"SSC",         color:"#6a1b9a", bg:"#f3e5f5" },
  { label:"UPSC",        color:"#b71c1c", bg:"#ffebee" },
  { label:"Police",      color:"#37474f", bg:"#eceff1" },
  { label:"Teaching",    color:"#e65100", bg:"#fff3e0" },
  { label:"Defence",     color:"#1b5e20", bg:"#e8f5e9" },
  { label:"Medical",     color:"#880e4f", bg:"#fce4ec" },
  { label:"State PSC",   color:"#4527a0", bg:"#ede7f6" },
  { label:"Engineering", color:"#004d40", bg:"#e0f2f1" },
  { label:"Delhi",       color:"#bf360c", bg:"#fbe9e7" },
  { label:"Parivahan",   color:"#00695c", bg:"#e0f2f1" },
  { label:"UIDAI",       color:"#f57f17", bg:"#fffde7" },
  { label:"PAN",         color:"#4e342e", bg:"#efebe9" },
  { label:"Post",        color:"#ff6f00", bg:"#fff8e1" },
];

const TICKER_ITEMS = [
  "🔴 RRB ALP Recruitment 2026 (CEN 01/2026) for 11,127 Posts, Apply Online!",
  "🔴 SSC CGL 2026 Notification for 12,256 Vacancies, Apply before 22nd June!",
  "🔴 BPSC 72nd CCE Notification for 1186 Posts, Apply Now!",
  "🔴 Bihar Police Special Branch Constable Exam Date Announced: 24th June 2026",
  "🔴 Bihar Lekhpal IT Sahayak Recruitment for 6,570 Posts, Apply Now!",
  "🔴 SSC CGL 2025 Final Result Declared",
  "🔴 BPSC AE 2025 Result Out",
  "🔴 UGC NET June 2026 Application Open",
  "🔴 UP Police Constable 52,699 Vacancies Coming Soon!",
  "🔴 IBPS RRB XII Application Started for 8,500+ Posts",
];

// ===================== SMALL COMPONENTS =====================

function NewHotBadge({ isNew, isHot }) {
  return (
    <>
      {isNew && <span className="badge-new">NEW</span>}
      {isHot && <span className="badge-hot">HOT</span>}
    </>
  );
}

function CatPill({ category }) {
  const c = CATEGORIES.find(x => x.label === category) || { color: "#555", bg: "#eee" };
  return (
    <span style={{
      background: c.bg, color: c.color, fontSize: "10px", padding: "1px 6px",
      borderRadius: "2px", marginRight: "6px", fontWeight: "600",
      border: `1px solid ${c.color}33`, display: "inline-block"
    }}>
      {category}
    </span>
  );
}

function ItemRow({ item, type, onViewDetails }) {
  const handleView = () => {
    if (item.details) {
      onViewDetails(item, type);
    } else {
      window.open(item.url, '_blank');
    }
  };
  return (
    <tr className="item-row">
      <td className="item-td">
        <div onClick={handleView} style={{cursor: 'pointer'}}>
          <span className="item-diamond">◆</span>
          <span className="item-title">{item.title}</span>
          <NewHotBadge isNew={item.isNew} isHot={item.isHot} />
        </div>
        <div style={{ marginTop: "3px" }}>
          <CatPill category={item.category} />
          <span className="item-meta">
            {type === "jobs"      && `Vacancies: ${item.posts} | Last Date: ${item.lastDate}`}
            {type === "results"   && `Result Date: ${item.date}`}
            {type === "admit"     && `Exam Date: ${item.examDate} | Released: ${item.date}`}
            {type === "answerkey" && `Date: ${item.date}`}
          </span>
        </div>
      </td>
      <td className="item-btn-td">
        <button onClick={handleView} className={`btn-${type === 'jobs' ? 'apply' : type === 'results' ? 'result' : type === 'admit' ? 'admit' : 'answer'}`}>
          {type === 'jobs' ? 'Apply Now' : type === 'results' ? 'View Result' : type === 'admit' ? 'Download' : 'View Key'}
        </button>
      </td>
    </tr>
  );
}

function SectionBox({ title, color, items, type, onViewAll, onViewDetails }) {
  return (
    <div className="section-box">
      <div className="section-header" style={{ background: color }}>
        <span>⚡ {title}</span>
        <button className="view-all-btn" onClick={onViewAll}>View All »</button>
      </div>
      <table className="item-table">
        <tbody>
          {items.slice(0, 8).map(item => (
            <ItemRow key={item.id} item={item} type={type} onViewDetails={onViewDetails} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Ticker() {
  const text = TICKER_ITEMS.join("    ||    ");
  return (
    <div className="ticker-wrap">
      <div className="ticker-label">📢 LATEST:</div>
      <div className="ticker-track">
        <div className="ticker-text">{text}</div>
      </div>
    </div>
  );
}

function StatsBanner() {
  const stats = [
    { label: "Active Vacancies", value: "2,45,000+", icon: "💼" },
    { label: "Open Forms",       value: "48",         icon: "📝" },
    { label: "Results Out",      value: "32",         icon: "📊" },
    { label: "Admit Cards",      value: "21",         icon: "🎫" },
  ];
  return (
    <div className="stats-grid">
      {stats.map(s => (
        <div key={s.label} className="stat-card">
          <div className="stat-value">{s.icon} {s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function CategoriesGrid({ onFilter }) {
  return (
    <div className="section-box" style={{ marginBottom: "14px" }}>
      <div className="section-header" style={{ background: "#003366" }}>
        🗂️ Browse by Category — Rojgar In Bihar 2026
      </div>
      <div className="cat-grid">
        {CATEGORIES.map(cat => (
          <button
            key={cat.label}
            className="cat-btn"
            style={{ background: cat.color }}
            onClick={() => onFilter(cat.label)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Sidebar({ setPage, setCatFilter }) {
  return (
    <aside className="sidebar">
      <div className="section-box">
        <div className="section-header" style={{ background: "#cc0000" }}>🔗 Important Links</div>
        {[
          { label: "Latest Online Form",  page: "jobs",      color: "#cc0000" },
          { label: "Rojgar In Bihar Result 2026", page: "results",   color: "#2e7d32" },
          { label: "Admit Card 2026",     page: "admitcard", color: "#e65c00" },
          { label: "Answer Key 2026",     page: "answerkey", color: "#6a1b9a" },
          { label: "Converter",           page: "converter", color: "#673ab7" },
          { label: "Syllabus 2026",       page: "syllabus",  color: "#1565c0" },
          { label: "Contact Us",          page: "contact",   color: "#37474f" },
        ].map(link => (
          <div
            key={link.page}
            className="sidebar-link"
            style={{ color: link.color }}
            onClick={() => {
              if (link.page === 'jobs') {
                setCatFilter('All');
              }
              setPage(link.page);
            }}
          >
            <span style={{ color: link.color, fontWeight: "bold" }}>▶</span> {link.label}
          </div>
        ))}
      </div>

      <div className="section-box" style={{ marginTop: "14px" }}>
        <div className="section-header" style={{ background: "#e65c00" }}>🎫 Upcoming Exams</div>
        {ADMIT_CARDS.slice(0, 5).map(item => (
          <div key={item.id} className="sidebar-item">
            <div className="sidebar-item-title">◆ {item.title}</div>
            <div className="sidebar-item-meta" style={{ color: "#e65c00" }}>
              Exam: {item.examDate}
            </div>
          </div>
        ))}
      </div>

      <div className="section-box" style={{ marginTop: "14px" }}>
        <div className="section-header" style={{ background: "#2e7d32" }}>📊 Latest Results</div>
        {RESULTS.slice(0, 5).map(item => (
          <div key={item.id} className="sidebar-item">
            <div className="sidebar-item-title">◆ {item.title}</div>
            <div className="sidebar-item-meta">{item.date}</div>
          </div>
        ))}
      </div>

      <div className="section-box" style={{ marginTop: "14px" }}>
        <div className="section-header" style={{ background: "#003366" }}>📱 Our Apps</div>
        <div style={{ padding: "12px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "#555", marginBottom: "10px", lineHeight: "1.6" }}>
            Get instant alerts for Sarkari Naukri on your phone!
          </p>
          <button className="btn-apply" style={{ width: "100%", padding: "8px", fontSize: "13px", marginBottom: "6px" }}>
            📱 Android App
          </button>
          <button className="btn-admit" style={{ width: "100%", padding: "8px", fontSize: "13px" }}>
            🍎 iOS App
          </button>
        </div>
      </div>

      <div className="disclaimer-box">
        <strong>⚠️ Disclaimer:</strong> RojgarInBihar is an informational portal.
        We do not charge any fee. Always verify from official government websites before applying.
      </div>
    </aside>
  );
}

// ===================== PAGES =====================

function HomePage({ setPage, setCatFilter, onViewDetails }) {
  return (
    <div className="home-grid">
      <div>
        <StatsBanner />
        <CategoriesGrid onFilter={category => {
          setCatFilter(category);
          if (["UIDAI", "PAN", "Parivahan"].includes(category)) {
            setPage("otherlinks");
          } else {
            setPage("jobs");
          }
        }} />
        <SectionBox
          title="Latest Online Form — Apply Now 2026" color="#cc0000" items={JOBS} type="jobs"
          onViewAll={() => { setCatFilter("All"); setPage("jobs"); }} onViewDetails={onViewDetails}
        />
        <SectionBox
          title="Rojgar In Bihar Result 2026" color="#2e7d32" items={RESULTS} type="results"
          onViewAll={() => setPage("results")} onViewDetails={onViewDetails}
        />
        <SectionBox
          title="Admit Card 2026 — Download Now"
          color="#e65c00" items={ADMIT_CARDS} type="admit"
          onViewAll={() => setPage("admitcard")}
        />
        <SectionBox
          title="Answer Key 2026" color="#6a1b9a" items={ANSWER_KEYS} type="answerkey"
          onViewAll={() => setPage("answerkey")} onViewDetails={onViewDetails}
        />
      </div>
      <Sidebar setPage={setPage} setCatFilter={setCatFilter} />
    </div>
  );
}

function FullListPage({ title, color, items, type, initialFilter = "All", onViewDetails }) {
  const [filter, setFilter] = useState(initialFilter);

  // Sync internal filter state if the initialFilter prop changes (e.g., from a new navigation)
  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  const cats = ["All", ...new Set(items.map(i => i.category))];
  const filtered = filter === "All" ? items : items.filter(i => i.category === filter);

  return (
    <div>
      <div
        className="section-header"
        style={{ background: color, borderRadius: "4px 4px 0 0", padding: "10px 14px", fontSize: "15px" }}
      >
        ⚡ {title}
      </div>
      <div className="filter-bar">
        <span className="filter-label">Filter:</span>
        {cats.map(cat => (
          <button
            key={cat}
            className="filter-btn"
            style={{
              background: filter === cat ? color : "#f0f0f0",
              color: filter === cat ? "#fff" : "#444",
              border: `1px solid ${filter === cat ? color : "#ccc"}`,
              fontWeight: filter === cat ? "bold" : "normal",
            }}
            onClick={() => setFilter(cat)}
          >
            {cat} {filter === cat && `(${filtered.length})`}
          </button>
        ))}
      </div>
      <div className="section-box" style={{ borderRadius: "0 0 4px 4px", borderTop: "none" }}>
        <table className="item-table">
          <tbody>
            {filtered.map(item => <ItemRow key={item.id} item={item} type={type} onViewDetails={onViewDetails} />)}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="no-results">No items found in this category.</p>
        )}
      </div>
    </div>
  );
}

function SyllabusPage() {
  return (
    <div>
      <div
        className="section-header"
        style={{ background: "#1565c0", borderRadius: "4px 4px 0 0", padding: "10px 14px", fontSize: "15px" }}
      >
        📘 Syllabus & Exam Pattern 2026
      </div>
      <div className="section-box" style={{ borderRadius: "0 0 4px 4px", borderTop: "none" }}>
        {SYLLABI.map(item => (
          <div key={item.id} className="syllabus-row">
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
              <div className="item-title" style={{ display: 'inline' }}>
                <span className="item-diamond">◆</span>{item.title}
              </div>
              <div style={{ marginTop: "4px" }}>
                <CatPill category={item.category} />
                <span className="item-meta">Updated: {item.updated}</span>
              </div>
            </a>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-syllabus">📄 PDF</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function OtherLinksListPage({ category }) {
  const categoryInfo = CATEGORIES.find(c => c.label === category) || { color: "#004d40", label: "Services" };
  const links = OTHER_LINKS.filter(link => link.category === category);

  return (
    <div>
      <div
        className="section-header"
        style={{ background: categoryInfo.color, borderRadius: "4px 4px 0 0", padding: "10px 14px", fontSize: "15px" }}
      >
        🔗 {categoryInfo.label} Services
      </div>
      <div className="section-box" style={{ borderRadius: "0 0 4px 4px", borderTop: "none" }}>
        {links.length > 0 ? links.map(item => (
          <div key={item.id} className="syllabus-row">
            <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
              <div className="item-title" style={{ display: 'inline' }}>
                <span className="item-diamond">◆</span>{item.title}
              </div>
              <div style={{ marginTop: "4px" }}>
                <CatPill category={item.category} />
              </div>
            </a>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-syllabus" style={{background: categoryInfo.color}}>Visit</a>
          </div>
        )) : (
          <p className="no-results">No links found for this category.</p>
        )}
      </div>
    </div>
  );
}

function DetailPage({ selectedItem, setPage }) {
  const { item } = selectedItem;
  const { details, title } = item;

  if (!details) {
    return (
      <div className="detail-page-box">
        <h1 style={{textAlign: 'center', margin: '40px 0'}}>Details Not Available</h1>
        <button onClick={() => setPage('home')} className="btn-apply" style={{display: 'block', margin: '0 auto', width: '120px'}}>
          &laquo; Go Back
        </button>
      </div>
    );
  }

  const DetailTable = ({ title, data, columns }) => (
    <div className="detail-section">
      <h2 className="detail-section-title">{title}</h2>
      <table className="detail-table">
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map(col => <td key={col}>{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="detail-page-box">
      <style>{`
        .detail-page-box { background: #fff; border: 1px solid #ddd; border-radius: 4px; padding: 20px; }
        .detail-header { text-align: center; border-bottom: 2px solid #cc0000; padding-bottom: 15px; margin-bottom: 20px; }
        .detail-header h1 { font-size: 24px; color: #cc0000; margin: 0 0 10px; }
        .detail-header p { margin: 4px 0; font-size: 14px; color: #555; }
        .short-info { font-size: 14px; line-height: 1.6; background: #f1f8ff; padding: 10px; border-left: 4px solid #1976d2; margin-top: 15px; text-align: left; }
        .detail-section { margin-bottom: 25px; }
        .detail-section-title { font-size: 18px; color: #fff; background: #003366; padding: 8px 12px; border-radius: 4px; margin-bottom: 10px; }
        .detail-table { width: 100%; border-collapse: collapse; }
        .detail-table td { border: 1px solid #ddd; padding: 8px; font-size: 14px; }
        .detail-table tr:nth-child(odd) { background: #f9f9f9; }
        .detail-table tr td:first-child { font-weight: bold; width: 35%; }
        .detail-list { list-style-type: none; padding-left: 0; }
        .detail-list li { background: #f9f9f9; border: 1px solid #ddd; padding: 10px; margin-bottom: 5px; font-size: 14px; border-left: 4px solid #2e7d32; }
        .detail-links-box { text-align: center; }
        .detail-links-box a { display: inline-block; background: #2e7d32; color: white; padding: 10px 20px; margin: 5px; text-decoration: none; font-weight: bold; border-radius: 4px; transition: background 0.2s; }
        .detail-links-box a:hover { background: #1b5e20; }
        .btn-back { display: block; margin: 20px auto 0; width: 120px; background: #757575; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; font-size: 14px; }
        .btn-back:hover { background: #616161; }
      `}</style>

      <div className="detail-header">
        <h1>{title}</h1>
        <p><strong>Post Date / Update:</strong> {details.postDate}</p>
        <p className="short-info"><strong>Short Information:</strong> {details.shortInfo}</p>
      </div>

      {details.importantDates && <DetailTable title="Important Dates" data={details.importantDates} columns={['label', 'date']} />}
      {details.applicationFee && <DetailTable title="Application Fee" data={details.applicationFee} columns={['category', 'fee']} />}

      {details.ageLimit && (
        <div className="detail-section">
          <h2 className="detail-section-title">Age Limit (as on {details.ageLimit.asOn})</h2>
          <table className="detail-table">
            <tbody>
              <tr><td>Minimum Age</td><td>{details.ageLimit.min}</td></tr>
              <tr><td>Maximum Age</td><td>{details.ageLimit.max}</td></tr>
              <tr><td colSpan="2">Age Relaxation Extra as per Recruitment Rules.</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {details.eligibility && (
         <div className="detail-section">
          <h2 className="detail-section-title">Vacancy Details Total: {details.totalPosts} Post</h2>
          <ul className="detail-list">
            {details.eligibility.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {details.categoryVacancy && (
        <div className="detail-section">
          <h2 className="detail-section-title">Category Wise Vacancy Details</h2>
          <table className="detail-table" style={{textAlign: 'center'}}>
            <thead><tr><th>Post Name</th><th>GEN</th><th>EWS</th><th>OBC</th><th>SC</th><th>ST</th><th>Total</th></tr></thead>
            <tbody>
              {details.categoryVacancy.map((row, i) => (
                <tr key={i}>
                  <td>{row.post}</td><td>{row.gen}</td><td>{row.ews}</td><td>{row.obc}</td><td>{row.sc}</td><td>{row.st}</td><td>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {details.howToFill && (
         <div className="detail-section">
          <h2 className="detail-section-title">How to Fill Form</h2>
          <ul className="detail-list">
            {details.howToFill.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {details.usefulLinks && (
        <div className="detail-section detail-links-box">
          <h2 className="detail-section-title">Some Useful Important Links</h2>
          {details.usefulLinks.map(link => <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
        </div>
      )}

      <button onClick={() => setPage('home')} className="btn-back">&laquo; Go Back</button>
    </div>
  );
}

function JpgToPdfTool({ onBack }) {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setStatus(`${e.target.files.length} image(s) selected.`);
    }
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setStatus('Please select images first.');
      return;
    }

    setStatus('Converting...');
    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const page = pdfDoc.addPage();
        const bytes = await file.arrayBuffer();
        let image;
        if (file.type === 'image/jpeg') {
          image = await pdfDoc.embedJpg(bytes);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(bytes);
        } else {
          console.warn(`Unsupported file type: ${file.type}. Skipping.`);
          continue;
        }
        
        const { width, height } = image.scale(1);
        const { width: pageWidth, height: pageHeight } = page.getSize();

        const widthRatio = pageWidth / width;
        const heightRatio = pageHeight / height;
        const ratio = Math.min(widthRatio, heightRatio, 1);

        const scaledWidth = width * ratio;
        const scaledHeight = height * ratio;

        page.drawImage(image, {
          x: (pageWidth - scaledWidth) / 2,
          y: (pageHeight - scaledHeight) / 2,
          width: scaledWidth,
          height: scaledHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'rojgarinbihar_converted.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setStatus('Conversion successful! Your download should start automatically.');
      setFiles([]);

    } catch (err) {
      console.error(err);
      setStatus('An error occurred during conversion. Please check the console.');
    }
  };

  return (
    <div className="tool-interface">
      <style>{`
        .tool-interface { padding: 20px; text-align: center; }
        .tool-interface h3 { font-size: 22px; color: #333; margin-bottom: 20px; }
        .file-input-label {
          display: inline-block;
          padding: 12px 25px;
          background: #1565c0;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
        }
        .file-input-label:hover { background: #0d47a1; }
        .file-input { display: none; }
        .tool-status { margin-top: 20px; font-size: 14px; color: #555; min-height: 20px; }
        .btn-convert {
          margin-top: 20px;
          padding: 12px 30px;
          font-size: 16px;
          font-weight: bold;
          background: #2e7d32;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-convert:disabled { background: #aaa; cursor: not-allowed; }
        .btn-convert:hover:not(:disabled) { background: #1b5e20; }
        .btn-back-tool {
            position: absolute;
            top: 15px;
            left: 15px;
            background: #757575;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        .btn-back-tool:hover { background: #616161; }
      `}</style>
      <button onClick={onBack} className="btn-back-tool">&laquo; Back to Tools</button>
      <h3>JPG to PDF Converter</h3>
      <label htmlFor="file-input" className="file-input-label">
        Select Images
      </label>
      <input 
        id="file-input"
        type="file" 
        multiple 
        accept="image/jpeg, image/png" 
        onChange={handleFileChange}
        className="file-input"
      />
      <div className="tool-status">{status}</div>
      <button onClick={handleConvert} disabled={files.length === 0} className="btn-convert">
        Convert to PDF
      </button>
    </div>
  );
}

function ConverterPage() {
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    { name: 'Merge PDF', icon: '📄+📄', description: 'Combine PDFs in the order you want.' },
    { name: 'Split PDF', icon: '✂️', description: 'Separate one page or a whole set for easy conversion.' },
    { name: 'Compress PDF', icon: '🗜️', description: 'Reduce file size while optimizing for maximal PDF quality.' },
    { name: 'PDF to Word', icon: '📄»📝', description: 'Easily convert your PDF files into editable DOCX documents.' },
    { name: 'PDF to PowerPoint', icon: '📄»📊', description: 'Turn your PDF files into easy-to-edit PPTX slideshows.' },
    { name: 'PDF to Excel', icon: '📄»📈', description: 'Pull data straight from PDFs into Excel spreadsheets.' },
    { name: 'Word to PDF', icon: '📝»📄', description: 'Make DOC and DOCX files easy to read by converting them to PDF.' },
    { name: 'PowerPoint to PDF', icon: '📊»📄', description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.' },
    { name: 'Excel to PDF', icon: '📈»📄', description: 'Make EXCEL spreadsheets easy to read by converting them to PDF.' },
    { name: 'PDF to JPG', icon: '📄»🖼️', description: 'Extract all images from a PDF or convert each page into a JPG.' },
    { name: 'JPG to PDF', icon: '🖼️»📄', description: 'Convert JPG images to PDF in seconds.' },
    { name: 'Sign PDF', icon: '✍️', description: 'Sign yourself or request electronic signatures from others.' },
  ];

  const handleToolClick = (toolName) => {
    if (toolName === 'JPG to PDF') {
      setActiveTool(toolName);
    } else {
      alert(`The "${toolName}" functionality is a UI placeholder and is not yet implemented.`);
    }
  };

  return (
    <div className="section-box" style={{ position: 'relative' }}>
      {activeTool === 'JPG to PDF' ? (
        <JpgToPdfTool onBack={() => setActiveTool(null)} />
      ) : (
        <>
          <div className="section-header" style={{ background: "#673ab7" }}>
            🔄 File Converter Tools
          </div>
          <style>{`
            .converter-grid {
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
              gap: 20px;
              padding: 20px;
            }
            .tool-card {
              background: #fff;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              cursor: pointer;
              transition: transform 0.2s, box-shadow 0.2s;
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            .tool-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            }
            .tool-icon {
              font-size: 48px;
              margin-bottom: 15px;
            }
            .tool-name {
              font-size: 16px;
              font-weight: bold;
              color: #333;
              margin-bottom: 8px;
            }
            .tool-description {
              font-size: 13px;
              color: #777;
              line-height: 1.5;
            }
          `}</style>
          <div className="converter-grid">
            {tools.map(tool => (
              <div key={tool.name} className="tool-card" onClick={() => handleToolClick(tool.name)}>
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-name">{tool.name}</div>
                <div className="tool-description">{tool.description}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function SearchPage({ query }) {
  const all = [
    ...JOBS.map(j        => ({ ...j, type: "jobs"      })),
    ...RESULTS.map(r     => ({ ...r, type: "results"   })),
    ...ADMIT_CARDS.map(a => ({ ...a, type: "admit"     })),
    ...ANSWER_KEYS.map(k => ({ ...k, type: "answerkey" })),
  ];
  const q = query.toLowerCase();
  const results = all.filter(i =>
    i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
  );
  return (
    <div>
      <div
        className="section-header"
        style={{ background: "#003366", borderRadius: "4px 4px 0 0", padding: "10px 14px", fontSize: "15px" }}
      >
        🔍 Search Results for &ldquo;{query}&rdquo; — {results.length} found
      </div>
      <div className="section-box" style={{ borderRadius: "0 0 4px 4px", borderTop: "none" }}>
        {results.length === 0 ? (
          <div className="no-results-big">
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔍</div>
            <div>No results found for &ldquo;{query}&rdquo;</div>
            <div style={{ fontSize: "13px", color: "#aaa", marginTop: "6px" }}>
              Try: Railway, Bank, SSC, UPSC, Police
            </div>
          </div>
        ) : (
          <table className="item-table">
            <tbody>
              {results.map(item => (
                <ItemRow key={`${item.type}-${item.id}`} item={item} type={item.type} onViewDetails={() => {}} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("Error: Please fill out all fields.");
      return;
    }
    // In a real app, you'd send this to a server.
    // For this demo, we'll just show a success message.
    console.log({ name, email, message });
    setStatus(`Success: Thank you for your message, ${name}! We will get back to you soon.`);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="section-box">
      <style>{`
        .contact-form-container {
          padding: 20px;
          border-top: 1px solid #eee;
          background: #f9fafb;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
        }
        .contact-form .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .contact-form-heading {
          font-size: 18px;
          color: #003366;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #003366;
        }
        .contact-form .form-group {
          margin-bottom: 15px;
        }
        .contact-form label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          font-size: 14px;
          color: #333;
        }
        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 12px;
          font-size: 14px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          box-sizing: border-box;
          background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #1565c0;
          box-shadow: 0 0 0 3px rgba(21, 101, 192, 0.15);
        }
        .contact-form textarea {
          resize: vertical;
          min-height: 120px;
        }
        .contact-form .btn-send {
          width: auto;
          padding: 12px 30px;
          font-size: 15px;
          font-weight: bold;
          background: #003366;
          color: white;
          transition: background-color 0.2s;
        }
        .contact-status {
          margin-top: 15px;
          padding: 10px;
          border-radius: 4px;
          font-size: 14px;
        }
        .contact-status.success {
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid #2e7d32;
        }
        .contact-status.error {
          background: #ffebee;
          color: #b71c1c;
          border: 1px solid #b71c1c;
        }
      `}</style>
      <div className="section-header" style={{ background: "#003366", fontSize: "15px" }}>
        📬 Contact Us — RojgarInBihar
      </div>
      <div style={{ padding: "20px" }}>
        <div className="contact-banner">
          <div style={{ fontSize: "20px", fontWeight: "900", marginBottom: "4px" }}>
            RojgarInBihar — rojgarinbihar.com
          </div>
          <div style={{ fontSize: "13px", opacity: 0.9 }}>
            India&apos;s #1 Government Job Portal | Since 2024 | Trusted by Millions
          </div>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <h3 className="contact-heading">📌 Contact Information</h3>
            <div className="contact-info">
              <div>🌐 Website: <strong>rojgarinbihar.com</strong></div>
              <div>📧 Email: info@rojgarinbihar.com</div>
              <div>📧 Queries: query@rojgarinbihar.com</div>
              <div>📱 Telegram: t.me/rojgarinbihar</div>
            </div>
          </div>
          <div className="contact-card">
            <h3 className="contact-heading">📱 Follow Us</h3>
            <div className="contact-info">
              <div>▶ YouTube: @RojgarInBihar</div>
              <div>▶ Instagram: @rojgarinbihar</div>
              <div>▶ Facebook: RojgarInBihar</div>
              <div>▶ Twitter/X: @RojgarInBihar</div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-form-container">
        <h2 className="contact-form-heading">✉️ Send us a Message</h2>
        <form onSubmit={handleContactSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                type="text"
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Your Email</label>
              <input
                type="email"
                id="contact-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="contact-message">Your Message</label>
            <textarea
              id="contact-message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
            ></textarea>
          </div>
          {status && (
            <div className={`contact-status ${status.startsWith("Success") ? "success" : "error"}`}>
              {status.substring(status.indexOf(":") + 2)}
            </div>
          )}
          <button type="submit" className="btn-send" style={{ marginTop: '10px' }}>Send Message</button>
        </form>
      </div>

      <div style={{ padding: '0 20px 20px 20px' }}>
        <div className="disclaimer-box" style={{ marginTop: "16px" }}>
          <strong>⚠️ Important Disclaimer:</strong>
          <p style={{ fontSize: "12px", marginTop: "6px", lineHeight: "1.7" }}>
            RojgarInBihar (rojgarinbihar.com) is an independent informational portal.
            We do not charge any application fee from candidates. Always apply through official
            government/recruitment board websites. Not affiliated with any government body.
          </p>
        </div>
      </div>
    </div>
  );
}

// ===================== MAIN APP =====================

export default function App() {
  const [page, setPage]               = useState("home");
  const [search, setSearch]           = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [catFilter, setCatFilter]     = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const NAV = [
    { label: "Home",        page: "home",      icon: "🏠" },
    { label: "Latest Jobs", page: "jobs",      icon: "💼" },
    { label: "Results",     page: "results",   icon: "📊" },
    { label: "Admit Card",  page: "admitcard", icon: "🎫" },
    { label: "Answer Key",  page: "answerkey", icon: "🗝️" },
    { label: "Syllabus",    page: "syllabus",  icon: "📘" },
    { label: "Converter",   page: "converter", icon: "🔄" },
    { label: "Contact",     page: "contact",   icon: "📬" },
  ];

  const handleSearch = e => {
    e.preventDefault();
    if (search.trim()) { setSearchQuery(search.trim()); setPage("search"); }
  };

  const handleViewDetails = (item, type) => {
    setSelectedItem({ item, type });
    setPage('details');
  };

  const pageLabel = page === 'details' ? selectedItem?.item.title : (NAV.find(l => l.page === page)?.label || "Search");

  return (
    <div className="app">

      {/* ── HEADER ── */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo-wrap" onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
            <div className="logo-circle">SN</div>
            <div>
            <div className="logo-title">ROJGARINBIHAR ®</div>
              <div className="logo-sub">rojgarinbihar.com</div>
            </div>
          </div>
          <div>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search Vacancy, Result, Admit Card..."
                className="search-input"
              />
              <button type="submit" className="search-btn">🔍 Search</button>
            </form>
            <div className="header-sub-links">📱 App Available | 📺 YouTube | 📢 Telegram</div>
          </div>
        </div>
      </header>

      {/* ── NAV ── */}
      <nav className="site-nav">
        <div className="container nav-inner">
          {NAV.map(link => (
            <button
              key={link.page}
              className={`nav-btn ${page === link.page ? "nav-btn-active" : ""}`}
              onClick={() => {
                if (link.page === 'jobs') {
                  setCatFilter('All');
                }
                setPage(link.page);
              }}
            >
              {link.icon} {link.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ── BREADCRUMB ── */}
      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <span>🏠 Home {page !== "home" && `» ${pageLabel}`}</span>
          <span className="breadcrumb-alert">
            📢 RRB ALP 9,144 Posts | SSC CGL 17,727 Posts | Apply Now!
          </span>
        </div>
      </div>

      {/* ── MAIN ── */}
      <main className="container main-content">
        {page === "home"      && <HomePage setPage={setPage} setCatFilter={setCatFilter} onViewDetails={handleViewDetails} />}
        {page === "jobs"      &&
          <FullListPage
            title={catFilter !== "All" ? `${catFilter} Jobs — Rojgar In Bihar 2026` : "Latest Online Form — Rojgar In Bihar 2026"}
            color="#cc0000" items={JOBS} type="jobs" initialFilter={catFilter} onViewDetails={handleViewDetails}
          />
        }
        {page === "results"   && <FullListPage title="Rojgar In Bihar Result 2026"          color="#2e7d32" items={RESULTS}      type="results"   onViewDetails={handleViewDetails} />}
        {page === "admitcard" && <FullListPage title="Admit Card 2026 — Download"   color="#e65c00" items={ADMIT_CARDS}  type="admit"     onViewDetails={handleViewDetails} />}
        {page === "answerkey" && <FullListPage title="Answer Key 2026 — Check Now"  color="#6a1b9a" items={ANSWER_KEYS}  type="answerkey" onViewDetails={handleViewDetails} />}
        {page === "details"   && <DetailPage selectedItem={selectedItem} setPage={setPage} />}
        {page === "otherlinks" && <OtherLinksListPage category={catFilter} />}
        {page === "syllabus"  && <SyllabusPage />}
        {page === "converter" && <ConverterPage />}
        {page === "search"    && <SearchPage query={searchQuery} />}
        {page === "contact"   && <ContactPage />}
      </main>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <h4 className="footer-heading">RojgarInBihar</h4>
            <p className="footer-text">
              India&apos;s trusted government job portal. Get latest Rojgar In Bihar updates,
              results, admit cards &amp; syllabus at rojgarinbihar.com
            </p>
          </div>
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            {[
              {label: "Latest Online Form", page: "jobs"},
              {label: "Rojgar In Bihar Result 2026", page: "results"},
              {label: "Admit Card 2026", page: "admitcard"},
              {label: "Answer Key 2026", page: "answerkey"},
              {label: "Syllabus 2026", page: "syllabus"},
            ].map(l => (
              <div key={l.label} className="footer-link" style={{cursor: 'pointer'}} onClick={() => {
                if (l.page === 'jobs') setCatFilter('All');
                setPage(l.page);
              }}>▶ {l.label}</div>
            ))}
          </div>
          <div>
            <h4 className="footer-heading">Top Categories</h4>
            {[
              {label: "Railway", filter: "Railway"},
              {label: "Bank / IBPS / SBI", filter: "Bank"},
              {label: "SSC", filter: "SSC"},
              {label: "UPSC", filter: "UPSC"},
              {label: "Police", filter: "Police"},
              {label: "Army / Navy / Defence", filter: "Defence"},
              {label: "Teaching / TET", filter: "Teaching"},
            ].map(c => (
              <div key={c.label} className="footer-link" style={{cursor: 'pointer'}} onClick={() => {
                setCatFilter(c.filter);
                setPage('jobs');
              }}>▶ {c.label}</div>
            ))}
          </div>
          <div>
            <h4 className="footer-heading">Follow Us</h4>
            <div className="footer-text" style={{ lineHeight: "2.2" }}>
              <div><a href="https://rojgarinbihar.com" target="_blank" rel="noopener noreferrer" className="footer-link">🌐 rojgarinbihar.com</a></div>
              <div><a href="https://t.me/RojgarInBihar" target="_blank" rel="noopener noreferrer" className="footer-link">📱 Telegram: @RojgarInBihar</a></div>
              <div><a href="https://instagram.com/rojgarinbihar" target="_blank" rel="noopener noreferrer" className="footer-link">📸 Instagram: @rojgarinbihar</a></div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2024–2026 RojgarInBihar | rojgarinbihar.com | All Rights Reserved</div>
          <div>Disclaimer: Informational portal only. Verify from official websites.</div>
        </div>
      </footer>

    </div>
  );
}
