

// src/components/RatingBadge.jsx
export default function RatingBadge({ value }) {
    const v = Number(value || 0).toFixed(1);
    let badgeColor = "bg-danger";
    if (v >= 4.5) badgeColor = "bg-success";
    else if (v >= 4.0) badgeColor = "bg-primary";
    else if (v >= 3.0) badgeColor = "bg-warning text-dark";
    else badgeColor = "bg-danger";

    return (
        <span className={`badge rounded-pill ${badgeColor} px-2 py-1 d-inline-flex align-items-center gap-1`}>
            <i className="fa-solid fa-star"></i>
            <span className="fw-semibold">{v}</span>
        </span>
    );
}