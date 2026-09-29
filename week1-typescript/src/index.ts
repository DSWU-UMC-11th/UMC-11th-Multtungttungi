type StudyMember = {
    ID: number;
    name: string;
    role: "Frontend" | "Backend" | "Fullstack";
    githubId?: string;
};

const members: StudyMember[] = [
    { ID: 1, name: "광수", role: "Frontend", githubId: "gwangsoo" },
    { ID: 2, name: "지수", role: "Backend" },
    { ID: 3, name: "하영", role: "Fullstack", githubId: "Hayoung0601" },
];

let selectedMember: StudyMember | null = null;
const foundMember = members.find((member) => member.ID === 3);

function selectMemberId(targetId: number) {
    const member = members.find((m) => m.ID === targetId);
    if (!member) {
        console.error(targetId + "번 ID를 가진 멤버는 없습니다.");
        return;
    }
    console.log(`멤버 이름: ${member.name}, 역할: ${member.role}`);
    if (member.githubId) {
        console.log(`GitHub ID: ${member.githubId}`);
    }
    else {
        console.log("GitHub ID가 없습니다.");
    }
}

selectMemberId(1);
selectMemberId(2);
selectMemberId(999);
