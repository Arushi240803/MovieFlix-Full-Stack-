import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function MovieSkeleton() {
  return (
    <div className="movie-card">

      <Skeleton height={300} />

      <h3>
        <Skeleton width={120} />
      </h3>

      <p>
        <Skeleton width={60} />
      </p>

    </div>
  );
}

export default MovieSkeleton;