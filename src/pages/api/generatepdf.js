"use client"
import jsPDF from "jspdf";
export default function GeneratePDF(props) {
  try {
    const handleSave = async() => {
        console.log("GENERATE PDF", props.data);
        const profile = props.data.profile
        const education = props.data.education
        const experience = props.data.experience
        const skill = props.data.skill
        const work = props.data.work
        const certification = props.data.certification

        const option = {
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        };

        const pdf = new jsPDF(option);

        
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();

        var averageCharWidth = pdf.getStringUnitWidth("A") * 11 / pdf.internal.scaleFactor;

        // Calculate maximum characters per line
        var maxCharsPerLine = Math.floor((width-25) / averageCharWidth);

        console.log("Maximum characters per line: " + maxCharsPerLine);

        let curX = 0
        let curY = 10

        // HEADER
        pdf.setTextColor(50, 50, 50);
        pdf.setFontSize(15)
        pdf.setFont('times', 'bold');
        pdf.text(profile.name, width / 2, curY, {
        align: "center",
        });
        pdf.setFontSize(11)
        pdf.setFont('times', 'normal');

        curY += 5
        pdf.text(`${profile.city}, ${profile.country} | ${profile.email} ${profile.phone_number ? '| ' + profile.phone_number : ""}`, width / 2, curY, {align: "center"})

        curY += 5
        pdf.text(`${profile.linkedin ? 'linkedin.com/in/' + profile.linkedin + '/' : ''} ${profile.portfolio ? '| github.com/' + profile.portfolio : ''}`, width / 2, curY, {align: "center"})

        // DIVIDER
        curY += 5
        pdf.line(0, curY, width, curY)

        // EDUCATION
        if (education.length !== 0 && Object.keys(education).length > 1) {
            pdf.setFontSize(13)
            pdf.setFont('times', 'bold');
            curY += 7
            pdf.text("EDUCATION", width / 2, curY, {align: "center"});

            curY += 7
            curX = 10
            education.forEach(item => {
                pdf.setFontSize(13)
                pdf.setFont('times', 'bold');
                pdf.text(item.institution, curX, curY, {align: "left"});
                
                pdf.setFontSize(11)
                pdf.setFont('times', 'normal');
                pdf.text(`${item.city ? item.city + ", " : ""}${item.country}`, width - 10, curY, {align: "right"});
        
                curY += 5
                pdf.setFont('times', 'bold');
                pdf.text(item.major, curX, curY, {align: "left"});
        
                curX += pdf.getStringUnitWidth(`${item.major}`) * 13 / pdf.internal.scaleFactor
                curX += 2
                pdf.setFont('times', 'italic');
                pdf.text(`GPA : ${item.grade}`, curX, curY, {align: "left"});
        
                pdf.setFont('times', 'normal');
                const start_date = new Date(item.start_date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(item.start_date).getFullYear()
                const end_date = item.end_date ? new Date(item.end_date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(item.end_date).getFullYear() : ""
                pdf.text(start_date + (end_date == start_date ? " - Present" : (end_date == "" ? "" : ` - ${end_date}`)), width - 10, curY, {align: "right"});
        
                curY += 6
                curX = 15
                pdf.setFont('times', 'normal');
                item.institution_information.forEach(information => {
                    pdf.circle(curX, curY-1, 0.5, 'F');
                    if (information.length > 105) {
                        let interval = 105
                        for (let index = 0; index < information.length; index+=interval) {
                            if (information.length - index > 105) {
                                let lastSpaceIndex = information.substring(index, index+105).lastIndexOf(" ");
                                pdf.text(information.substring(index, index+lastSpaceIndex), curX+2, curY, {align: "left"});
                                // pdf.text(`${information[index+105] == ' ' ? information.substring(index, index+105) : information.substring(index, index+105) + "-"}`, curX+2, curY, {align: "left"});
                                interval = lastSpaceIndex + 1
                                curY += 5                    
                            } else {
                                pdf.text(information.substring(index, information.length), curX+2, curY, {align: "left"});
                                curY += 5                    
                            }
                        }
                    } else {
                        pdf.text(information, curX+2, curY, {align: "left"});
                        curY += 5
                    }
                })
            });
        }
        

        // WORK
        if (work.length !== 0 && Object.keys(work).length > 1) {
            pdf.setFontSize(13)
            pdf.setFont('times', 'bold');
            curY += 7
            pdf.text("PROFESSIONAL EXPERIENCE", width / 2, curY, {align: "center"});

            curY += 6
            work.forEach(item => {
                pdf.setFontSize(13)
                pdf.setFont('times', 'bold');
                pdf.text(item.subtitle, 10, curY, {align: "left"});

                pdf.setFontSize(11)
                pdf.setFont('times', 'normal');
                pdf.text(`${item.city ? item.city + ", " : ""}${item.country}`, width - 10, curY, {align: "right"});
                
                curY += 5
                pdf.setFont('times', 'bold');
                pdf.text(item.position, 10, curY, {align: "left"});
                pdf.setFont('times', 'normal');
                const start_date = new Date(item.start_date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(item.start_date).getFullYear()
                const end_date = item.end_date ? new Date(item.end_date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(item.end_date).getFullYear() : ""
                pdf.text(start_date + (end_date == start_date ? " - Present" : (end_date == "" ? "" : ` - ${end_date}`)), width - 10, curY, {align: "right"});

                curY += 6
                curX = 15
                pdf.setFont('times', 'normal');
                item.work_information.forEach(information => {
                    information = information.replace(/[\n\t]+/g, ' ').replace(/\s{2,}/g, ' ');
                    pdf.circle(curX, curY-1, 0.5, 'F');
                    if (information.length > 105) {
                        let interval = 105
                        for (let index = 0; index < information.length; index+=interval) {
                            if (information.length - index > 105) {
                                let lastSpaceIndex = information.substring(index, index+105).lastIndexOf(" ");
                                pdf.text(information.substring(index, index+lastSpaceIndex), curX+2, curY, {align: "left"});
                                // pdf.text(`${information[index+105] == ' ' ? information.substring(index, index+105) : information.substring(index, index+105) + "-"}`, curX+2, curY, {align: "left"});
                                interval = lastSpaceIndex + 1
                                curY += 5                    
                            } else {
                                pdf.text(information.substring(index, information.length), curX+2, curY, {align: "left"});
                                curY += 5                    
                            }
                        }
                    } else {
                        pdf.text(information, curX+2, curY, {align: "left"});
                        curY += 5
                    }
                })
            });
        }
        

        // EXPERIENCE
        if (experience.length !== 0 && Object.keys(experience).length > 1) {
            pdf.setFontSize(13)
            pdf.setFont('times', 'bold');
            curY += 7
            pdf.text("EXPERIENCE", width / 2, curY, {align: "center"});

            curY += 8
            curX = 10
            experience.forEach(item => {
                pdf.setFontSize(13);
                pdf.setFont('times', 'bold');
                pdf.text(`${item.position},`, curX, curY, {align: "left"});

                curX += pdf.getStringUnitWidth(`${item.position},`) * 13 / pdf.internal.scaleFactor
                curX += 2
                pdf.setFontSize(11);
                pdf.text(`${item.title}`, curX, curY, {align: "left"});

                pdf.setFontSize(11)
                pdf.setFont('times', 'normal');
                pdf.text(`${item.city ? item.city + ", " : ""}${item.country}`, width - 10, curY, {align: "right"});
                
                curY += 5
                pdf.setFont('times', 'bold');
                pdf.text(item.subtitle, 10, curY, {align: "left"});
                pdf.setFont('times', 'normal');
                const start_date = new Date(item.start_date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(item.start_date).getFullYear()
                const end_date = item.end_date ? new Date(item.end_date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(item.end_date).getFullYear() : ""
                pdf.text(start_date + (end_date == start_date ? " - Present" : (end_date == "" ? "" : ` - ${end_date}`)), width - 10, curY, {align: "right"});
                
                curY += 6
                curX = 15
                pdf.setFont('times', 'normal');
                item.exp_information.forEach(information => {
                    information = information.replace(/[\n\t]+/g, ' ').replace(/\s{2,}/g, ' ');
                    pdf.circle(curX, curY-1, 0.5, 'F');
                    if (information.length > 105) {
                        let interval = 105
                        for (let index = 0; index < information.length; index+=interval) {
                            if (information.length - index > 105) {
                                let lastSpaceIndex = information.substring(index, index+105).lastIndexOf(" ");
                                pdf.text(information.substring(index, index+lastSpaceIndex), curX+2, curY, {align: "left"});
                                // pdf.text(`${information[index+105] == ' ' ? information.substring(index, index+105) : information.substring(index, index+105) + "-"}`, curX+2, curY, {align: "left"});
                                interval = lastSpaceIndex + 1
                                curY += 5                    
                            } else {
                                pdf.text(information.substring(index, information.length), curX+2, curY, {align: "left"});
                                curY += 5                    
                            }
                        }
                    } else {
                        pdf.text(information, curX+2, curY, {align: "left"});
                        curY += 5
                    }
                })
            });
        }
        

        // CERTIFICATION
        if (certification.length !== 0 && Object.keys(certification).length > 1) {
            pdf.setFontSize(13)
            pdf.setFont('times', 'bold');
            curY += 7
            pdf.text("CERTIFICATION", width / 2, curY, {align: "center"});

            curY += 8
            certification.forEach(item => {
                curX = 10
                pdf.circle(curX, curY-1, 0.5, 'F');

                curX += 2
                pdf.setFontSize(11);
                pdf.setFont('times', 'bold');
                pdf.text(`${item.subtitle},`, curX, curY, {align: "left"});

                curX += pdf.getStringUnitWidth(`${item.subtitle},`) * 11 / pdf.internal.scaleFactor
                curX += 2
                pdf.setFont('times', 'normal');
                pdf.text(`${item.title},`, curX, curY, {align: "left"});

                curX += pdf.getStringUnitWidth(`${item.title},`) * 11 / pdf.internal.scaleFactor
                curX += 2
                const start_date = new Date(item.start_date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(item.start_date).getFullYear()
                const end_date = item.end_date ? new Date(item.end_date).toLocaleString('default', { month: 'long' }) + ' ' + new Date(item.end_date).getFullYear() : ""
                pdf.text(`(${start_date + (item.end_date == item.start_date ? " - Present" : (end_date == "" ? "" : ` - ${end_date}`))})`, curX, curY, {align: "left"});
                
                curY += 5        
            });
        }
        

        // SKILL
        if (skill.length !== 0 && Object.keys(skill).length > 1) {
            pdf.setFontSize(13)
            pdf.setFont('times', 'bold');
            curY += 7
            pdf.text("CORE COMPETENCIES", width / 2, curY, {align: "center"});

            curY += 8
            skill.forEach(item => {
                curX = 10
                curX += 2
                pdf.setFontSize(11);
                pdf.setFont('times', 'bold');
                pdf.text(`${item.category}`, curX, curY, {align: "left"});

                curY += 5
                curX = 15
                pdf.setFont('times', 'normal');
                item.skill_information.forEach(information => {
                    if (information.value.length > 105) {
                        let interval = 105
                        for (let index = 0; index < information.value.length; index+=interval) {
                            pdf.circle(curX, curY-1, 0.5, 'F');
                            if (information.value.length - index > 105) {
                                let lastSpaceIndex = information.value.substring(index, index+105).lastIndexOf(" ");
                                pdf.text(information.value.substring(index, index+lastSpaceIndex), curX+2, curY, {align: "left"});
                                interval = lastSpaceIndex + 1
                                curY += 5                    
                            } else {
                                pdf.text(information.value.substring(index, information.value.length), curX+2, curY, {align: "left"});
                                curY += 5                    
                            }
                        }
                    } else {
                        if (curX > 180) {
                            curX = 15
                            curY += 5
                        }
                        pdf.circle(curX, curY-1, 0.5, 'F');
                        pdf.text(information.value, curX+2, curY, {align: "left"});
                        curX += 30 + (30 * (Math.floor(information.value.length / 15)))
                    }
                })
                curY += 5
            });
            
            
            await pdf.save(`Resume - ${Date.now()}.pdf`);}
        }

    return (
        <a onClick={handleSave}>Download</a>
    )

} catch (error) {
    console.error(error);
  }
}
