import React from 'react';

function getJobDetails(item, type = "jobs") {
  if (item.details) return item.details;

  // Otherwise, let's construct a beautiful, detailed object dynamically!
  const title = item.title;
  const category = item.category || "Other";
  
  // 1. Organization & Advertisement details
  let org = "Government Department";
  let advt = "RIB/2026/" + item.id;
  
  if (title.includes("SSC")) {
    org = "Staff Selection Commission (SSC)";
    if (title.includes("CGL")) advt = "SSC-CGL-2026/01";
    else if (title.includes("GD")) advt = "SSC-GD-2026/02";
  } else if (title.includes("RRB")) {
    org = "Railway Recruitment Board (RRB)";
    if (title.includes("ALP")) advt = "CEN 01/2026";
    else if (title.includes("Technician")) advt = "CEN 02/2026";
  } else if (title.includes("BPSC")) {
    org = "Bihar Public Service Commission (BPSC)";
    if (title.includes("72nd")) advt = "BPSC-72/2026";
  } else if (title.includes("SBI")) {
    org = "State Bank of India (SBI)";
    advt = "SBI-PO/2026/08";
  } else if (title.includes("IBPS")) {
    org = "Institute of Banking Personnel Selection (IBPS)";
    advt = "IBPS-CRP-XII/2026";
  } else if (title.includes("UPSC")) {
    org = "Union Public Service Commission (UPSC)";
    advt = "UPSC-IAS/2026";
  } else if (title.includes("Bihar Police")) {
    org = "Central Selection Board of Constables (CSBC)";
    advt = "CSBC-BP/2026/01";
  } else if (title.includes("UP Police")) {
    org = "Uttar Pradesh Police Recruitment Board (UPPRPB)";
    advt = "UPP-PC/2026/05";
  } else if (title.includes("NIPER")) {
    org = "National Institute of Pharmaceutical Education and Research (NIPER)";
    advt = "NIPER-H/2026/03";
  } else if (title.includes("Sainik School")) {
    org = "Sainik School Gopalganj";
    advt = "SSG/2026/02";
  } else if (title.includes("IIM")) {
    org = "Indian Institute of Management (IIM) Bodh Gaya";
    advt = "IIMBG/2026/N-01";
  } else if (title.includes("ATMA")) {
    org = "Agricultural Technology Management Agency (ATMA) Arwal";
    advt = "ATMA-A/2026/04";
  }

  // Extract Advt from title if inside parentheses
  const matchParentheses = title.match(/\(([^)]+)\)/);
  if (matchParentheses) {
    advt = matchParentheses[1];
  }

  // If this is not a job, we construct custom info structures
  if (type === "results") {
    return {
      postDate: item.date,
      shortInfo: `${org} has declared the written examination results/marks for the ${title}. Candidates who were enrolled in this recruitment exam can download and view their result and merit list now using the links provided below.`,
      importantDates: [
        { label: "Exam Date", date: "As per Schedule" },
        { label: "Result Announced Date", date: item.date },
      ],
      applicationFee: [
        { category: "Fee Status", fee: "Released (Free to check result / cutoff marks)" }
      ],
      totalPosts: "Refer to Recruitment Notification",
      eligibility: [
        "Candidates who appeared in the examination can view their results online.",
        "Download Result PDF/Cutoff file and search your Roll Number/Name."
      ],
      advtNumber: advt,
      departmentName: org,
      usefulLinks: [
        { label: "Download Result PDF", url: item.url },
        { label: "Download Cutoff Marks", url: item.url },
        { label: "Official Website", url: item.url },
      ]
    };
  }

  if (type === "admit") {
    return {
      postDate: item.date,
      shortInfo: `${org} has released the online exam admit card/hall ticket for the ${title}. All candidates registered for this exam can download their admit card online using their login credentials (Registration No & Date of Birth).`,
      importantDates: [
        { label: "Exam Date", date: item.examDate || "As per Schedule" },
        { label: "Admit Card Released", date: item.date },
      ],
      applicationFee: [
        { category: "Fee Status", fee: "Released (No fee required to download hall ticket)" }
      ],
      totalPosts: "Refer to Recruitment Notification",
      eligibility: [
        "Candidates must have a valid registration number and password to login.",
        "Ensure to carry a printed copy of the Admit Card along with a valid ID proof to the exam hall."
      ],
      advtNumber: advt,
      departmentName: org,
      usefulLinks: [
        { label: "Download Admit Card", url: item.url },
        { label: "Download Exam Schedule Notice", url: item.url },
        { label: "Official Website", url: item.url },
      ]
    };
  }

  if (type === "answerkey") {
    return {
      postDate: item.date,
      shortInfo: `${org} has uploaded the official written exam answer keys for the ${title}. Candidates can check the correct answers, download the question booklet, and file objections/challenges if any during the designated window.`,
      importantDates: [
        { label: "Exam Date", date: "As per Schedule" },
        { label: "Answer Key Released", date: item.date },
        { label: "Last Date for Objections", date: "Refer to Notice" }
      ],
      applicationFee: [
        { category: "Fee Status", fee: "Free to view answer key (Objection fees as per rules)" }
      ],
      totalPosts: "Refer to Recruitment Notification",
      eligibility: [
        "All candidates who appeared in the exam can match their responses.",
        "Objections can be submitted online with payment of standard fee per query."
      ],
      advtNumber: advt,
      departmentName: org,
      usefulLinks: [
        { label: "Download Answer Key / Responses", url: item.url },
        { label: "Download Objection Instructions", url: item.url },
        { label: "Official Website", url: item.url },
      ]
    };
  }

  // 2. Application fee based on category
  let appFee = [
    { category: "General / OBC / EWS", fee: "100/-" },
    { category: "SC / ST", fee: "0/-" },
    { category: "All Category Female", fee: "0/-" }
  ];
  if (category === "Bank") {
    appFee = [
      { category: "General / OBC / EWS", fee: "750/-" },
      { category: "SC / ST / PH", fee: "125/-" }
    ];
  } else if (category === "Railway") {
    appFee = [
      { category: "General / OBC / EWS", fee: "500/- (Refundable)" },
      { category: "SC / ST / Female / Ex-Servicemen", fee: "250/- (Refundable)" }
    ];
  } else if (category === "Teaching") {
    appFee = [
      { category: "General / OBC / EWS", fee: "800/-" },
      { category: "SC / ST", fee: "400/-" }
    ];
  } else if (category === "State PSC") {
    appFee = [
      { category: "General / OBC / Other State", fee: "600/-" },
      { category: "SC / ST of Bihar", fee: "150/-" },
      { category: "Bihar Female Candidates", fee: "150/-" }
    ];
  }

  // 3. Age limits based on category
  let ageMin = "18 Years";
  let ageMax = "27 Years";
  if (category === "Police") {
    ageMin = "18 Years";
    ageMax = "25 Years";
  } else if (category === "UPSC" || category === "State PSC") {
    ageMin = "21 Years";
    ageMax = "37 Years";
  } else if (category === "Teaching") {
    ageMin = "21 Years";
    ageMax = "40 Years";
  }

  // 4. Eligibility & Qualification based on category
  let eligibility = [
    "Bachelor Degree in Any Stream from Any Recognized University in India.",
    "More Eligibility Details Read the Full Notification."
  ];
  if (category === "Railway") {
    eligibility = [
      "10th Class / Matriculation plus ITI certificate in relevant trade OR",
      "Diploma / Degree in Engineering (Mechanical / Electrical / Electronics / Automobile).",
      "More Eligibility Details Read the Notification."
    ];
  } else if (category === "Police") {
    eligibility = [
      "10+2 Intermediate Exam from Any Recognized Board in India.",
      "Physical standards: Height & Chest as per rules.",
      "More Eligibility Details Read the Notification."
    ];
  } else if (category === "Teaching") {
    eligibility = [
      "Bachelor Degree / Graduation with B.Ed or D.El.Ed from any recognized institution.",
      "Teacher Eligibility Test (TET/CTET/STET) Qualified.",
      "More Eligibility Details Read the Notification."
    ];
  } else if (category === "Engineering") {
    eligibility = [
      "B.E. / B.Tech / Diploma in Civil / Mechanical / Electrical Engineering.",
      "More Eligibility Details Read the Notification."
    ];
  }

  // 5. Selection Process
  let selectionProcess = [
    "Written Examination (Computer Based Test - CBT)",
    "Skill Test / Typing Test / Physical Test (wherever applicable)",
    "Document Verification",
    "Medical Examination"
  ];
  if (category === "Police" || category === "Defence") {
    selectionProcess = [
      "Written CBT Examination",
      "Physical Efficiency Test (PET) & Physical Measurement Test (PMT)",
      "Document Verification & Medical Exam"
    ];
  } else if (title.includes("PO") || title.includes("Officer")) {
    selectionProcess = [
      "Preliminary Written CBT Exam",
      "Mains Written Examination",
      "Personal Interview / Group Discussion"
    ];
  }

  // 6. Syllabus Topics
  const syllabusTopics = [
    "General Intelligence & Reasoning: Analogy, classification, series, decoding, coding.",
    "Quantitative Aptitude: Number systems, percentages, ratio & proportion, time & work, algebra, geometry.",
    "General English: Comprehension, grammar, synonyms, antonyms, correction.",
    "General Awareness: Current affairs, history, geography, constitution, science, bihar GK."
  ];

  return {
    postDate: item.date,
    shortInfo: `Applications are invited for the post of ${title} under ${org}. Eligible candidates can apply online from the link provided in the important links section before the last date (${item.lastDate}). For selection criteria, eligibility details, and syllabus topics, please read the guidelines below.`,
    importantDates: [
      { label: "Application Begin Date", date: item.date },
      { label: "Last Date for Apply Online", date: item.lastDate },
      { label: "Last Date to Pay Exam Fee", date: item.lastDate },
      { label: "Exam Date", date: "As per Schedule" },
      { label: "Admit Card Released", date: "4 Days Before Exam" },
      { label: "Result Announced", date: "To be notified" },
    ],
    applicationFee: appFee,
    ageLimit: { min: ageMin, max: ageMax, asOn: "01/07/2026" },
    totalPosts: item.posts || "Various",
    eligibility: eligibility,
    advtNumber: advt,
    departmentName: org,
    selectionProcess: selectionProcess,
    syllabus: syllabusTopics,
    usefulLinks: [
      { label: "Apply Online", url: item.url },
      { label: "Download Notification", url: item.url },
      { label: "Official Website", url: item.url },
      { label: "Download Syllabus", url: item.url },
    ]
  };
}

export default function DetailPage({ selectedItem, setPage }) {
  const { item, type = "jobs" } = selectedItem;
  const details = getJobDetails(item, type);

  const handleShare = () => {
    let shareText = `Check out details for ${item.title} on RojgarInBihar!`;
    if (type === "jobs") shareText = `Check out vacancy details for ${item.title} on RojgarInBihar!`;
    else if (type === "results") shareText = `Check out the exam result for ${item.title} on RojgarInBihar!`;
    else if (type === "admit") shareText = `Download admit card for ${item.title} on RojgarInBihar!`;
    else if (type === "answerkey") shareText = `Check answer key for ${item.title} on RojgarInBihar!`;

    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  let primaryBtnLabel = "Apply Online";
  let secondaryBtnLabel = "Download Notification";
  let thirdBtnLabel = "Official Website";
  let shareLabel = "Share Vacancy";

  if (type === "results") {
    primaryBtnLabel = "Download Result";
    secondaryBtnLabel = "Download Cutoff";
    shareLabel = "Share Result";
  } else if (type === "admit") {
    primaryBtnLabel = "Download Admit Card";
    secondaryBtnLabel = "Download Exam Notice";
    shareLabel = "Share Admit Card";
  } else if (type === "answerkey") {
    primaryBtnLabel = "Download Answer Key";
    secondaryBtnLabel = "Download Question Paper";
    shareLabel = "Share Answer Key";
  }

  return (
    <div className="sr-detail-container">
      <div className="sr-detail-header">
        <h2>{details.departmentName}</h2>
        <h1>{item.title}</h1>
        <div className="sr-detail-meta">
          {details.advtNumber && <span><strong>Advt No:</strong> {details.advtNumber}</span>}
          <span><strong>Post Date:</strong> {details.postDate}</span>
          {type === "jobs" && <span><strong>Last Date:</strong> {item.lastDate}</span>}
          {type === "results" && <span><strong>Result Date:</strong> {item.date}</span>}
          {type === "admit" && <span><strong>Exam Date:</strong> {item.examDate || "As per Schedule"}</span>}
          {type === "answerkey" && <span><strong>Released Date:</strong> {item.date}</span>}
        </div>
      </div>

      <div className="sr-action-bar">
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="sr-btn sr-btn-success">
          {primaryBtnLabel}
        </a>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="sr-btn sr-btn-primary">
          {secondaryBtnLabel}
        </a>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="sr-btn sr-btn-secondary">
          {thirdBtnLabel}
        </a>
        <button onClick={handleShare} className="sr-btn sr-btn-info">
          {shareLabel}
        </button>
      </div>

      <table className="sr-main-table">
        <tbody>
          {/* Row 1: Important Dates & Application Fee */}
          <tr>
            <td>
              <div className="sr-double-col">
                <div className="sr-split-border">
                  <div className="sr-section-title">📅 Important Dates</div>
                  <div className="sr-inner-padding">
                    <table className="sr-grid-table" style={{ marginTop: 0 }}>
                      <tbody>
                        {details.importantDates.map((d, index) => (
                          <tr key={index}>
                            <td style={{ fontWeight: 'bold', width: '60%' }}>{d.label}</td>
                            <td>{d.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <div className="sr-section-title">💳 Application Fee / Status</div>
                  <div className="sr-inner-padding">
                    <table className="sr-grid-table" style={{ marginTop: 0 }}>
                      <tbody>
                        {details.applicationFee.map((f, index) => (
                          <tr key={index}>
                            <td style={{ fontWeight: 'bold', width: '60%' }}>{f.category}</td>
                            <td>{f.fee}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </td>
          </tr>

          {/* Row 2: Age Limit (Only for Jobs) */}
          {type === "jobs" && details.ageLimit && (
            <tr>
              <td>
                <div className="sr-section-title">🔞 Age Limit (as on {details.ageLimit.asOn})</div>
                <div className="sr-inner-padding">
                  <ul className="sr-list">
                    <li><strong>Minimum Age:</strong> {details.ageLimit.min}</li>
                    <li><strong>Maximum Age:</strong> {details.ageLimit.max}</li>
                    <li><strong>Age Relaxation:</strong> Extra as per government recruitment rules. Please download the full notification to check post-wise relaxation details.</li>
                  </ul>
                </div>
              </td>
            </tr>
          )}

          {/* Row 3: Vacancy Details Table */}
          <tr>
            <td>
              <div className="sr-section-title">
                {type === "jobs" ? `📊 Vacancy Details Total: ${details.totalPosts} Posts` : `📊 Information & Eligibility Details`}
              </div>
              <div className="sr-inner-padding">
                <table className="sr-grid-table" style={{ marginTop: 0 }}>
                  <thead>
                    {type === "jobs" ? (
                      <tr>
                        <th style={{ width: '40%' }}>Post Name</th>
                        <th style={{ width: '20%' }}>Total Posts</th>
                        <th>Eligibility & Educational Qualification</th>
                      </tr>
                    ) : (
                      <tr>
                        <th style={{ width: '45%' }}>Exam / Post Name</th>
                        <th style={{ width: '15%' }}>Status</th>
                        <th>Brief Info & Candidate Guidelines</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>{item.title}</td>
                      <td>{type === "jobs" ? details.totalPosts : "Active"}</td>
                      <td>
                        <ul className="sr-list" style={{ paddingLeft: '15px' }}>
                          {details.eligibility.map((el, i) => (
                            <li key={i}>{el}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>

          {/* Row 4: Selection Process (Only for Jobs) */}
          {type === "jobs" && details.selectionProcess && (
            <tr>
              <td>
                <div className="sr-section-title">🔍 Selection Process</div>
                <div className="sr-inner-padding">
                  <ol className="sr-list" style={{ paddingLeft: '20px' }}>
                    {details.selectionProcess.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>
              </td>
            </tr>
          )}

          {/* Row 5: Syllabus topics (Only for Jobs) */}
          {type === "jobs" && details.syllabus && (
            <tr>
              <td>
                <div className="sr-section-title">📚 Syllabus & Subjects</div>
                <div className="sr-inner-padding">
                  <ul className="sr-list">
                    {details.syllabus.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                </div>
              </td>
            </tr>
          )}

          {/* Row 6: Important Links Table */}
          <tr>
            <td>
              <div className="sr-section-title">🔗 Some Useful Important Links</div>
              <div className="sr-inner-padding">
                <table className="sr-grid-table" style={{ marginTop: 0 }}>
                  <thead>
                    <tr>
                      <th style={{ width: '60%' }}>Link Description</th>
                      <th style={{ textAlign: 'center' }}>Link Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.usefulLinks ? (
                      details.usefulLinks.map((link, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 'bold' }}>{link.label}</td>
                          <td style={{ textAlign: 'center' }}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="sr-btn sr-btn-primary" style={{ display: 'inline-block', padding: '6px 16px', fontSize: '12px' }}>
                              Click Here
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr>
                          <td style={{ fontWeight: 'bold' }}>Apply Online</td>
                          <td style={{ textAlign: 'center' }}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="sr-btn sr-btn-success" style={{ display: 'inline-block', padding: '6px 16px', fontSize: '12px' }}>
                              Apply Here
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 'bold' }}>Download Notification</td>
                          <td style={{ textAlign: 'center' }}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="sr-btn sr-btn-primary" style={{ display: 'inline-block', padding: '6px 16px', fontSize: '12px' }}>
                              Download
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ fontWeight: 'bold' }}>Official Website</td>
                          <td style={{ textAlign: 'center' }}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="sr-btn sr-btn-secondary" style={{ display: 'inline-block', padding: '6px 16px', fontSize: '12px' }}>
                              Visit Site
                            </a>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: 'center', padding: '24px', background: '#f8fafc' }}>
        <button onClick={() => setPage('home')} className="btn-back" style={{ display: 'inline-block', width: 'auto', padding: '10px 24px', margin: 0 }}>
          &laquo; Back to Homepage
        </button>
      </div>
    </div>
  );
}
