import { Image, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useMovie } from "@/hooks/useMovie";
import Container from "../shared/Container";
import { constants } from "@/constants";

const DetailContent = () => {
  const { id } = useLocalSearchParams();
  const { movie } = useMovie(id as string);
  const year = movie?.releaseDate.split("-")[0];

  function formatNumber(num: number) {
    if (num < 1000) return num.toString();
    if (num < 1_000_000)
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }

  function formatDateWorldwide(dateString: string) {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    const formatted = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

    return `${formatted} (Worldwide)`;
  }

  const countries = movie?.countries.flatMap((country, index, arr) =>
    index === arr.length - 1 ? [country] : [country, ""]
  );
  const productionCompanies = movie?.productionCompanies.flatMap(
    (productionCompany: string, index: number, arr: string[]) =>
      index === arr.length - 1 ? [productionCompany] : [productionCompany, ""]
  );

  function formatCurrencyAbbreviation(amount: string) {
    const num = Number(amount.toString().replace(/[^0-9.-]+/g, ""));

    if (isNaN(num)) return amount;

    if (num >= 1_000_000_000) {
      return `$${(num / 1_000_000_000).toFixed(
        num % 1_000_000_000 === 0 ? 0 : 1
      )} billion`;
    } else if (num >= 1_000_000) {
      return `$${(num / 1_000_000).toFixed(
        num % 1_000_000 === 0 ? 0 : 1
      )} million`;
    } else if (num >= 1_000) {
      return `$${(num / 1_000).toFixed(num % 1_000 === 0 ? 0 : 1)} thousand`;
    } else {
      return `$${num}`;
    }
  }

  return (
    <Container style={styles.container}>
      <Text style={styles.title}>{movie?.title}</Text>
      <View style={styles.summary}>
        <Text style={styles.releaseDate}>{year}</Text>
        <Text style={[styles.releaseDate, styles.dot]}></Text>
        <Text style={styles.releaseDate}>PG-13</Text>
        <Text style={[styles.releaseDate, styles.dot]}></Text>
        <Text style={styles.releaseDate}>{movie?.duration}</Text>
      </View>
      <View style={styles.rating}>
        <Image
          style={styles.ratingImage}
          source={require("@/assets/images/Rating.png")}
        />
        <Text style={[styles.ratingText, { color: constants.white }]}>
          {movie?.rating.average.toFixed(2)}
          <Text style={styles.ratingText}>
            /10 ({formatNumber(movie?.rating.count || 0)})
          </Text>
        </Text>
      </View>
      <View>
        <Text style={[styles.heading, { marginVertical: 10 }]}>Overview</Text>
        <Text style={styles.overviewDescription}>{movie?.description}</Text>
      </View>
      <View style={styles.flexRow}>
        <View>
          <Text style={styles.heading}>Release date</Text>
          <Text style={styles.descriptionText}>
            {formatDateWorldwide(movie?.releaseDate || "2019-05-26")}
          </Text>
        </View>
        <View>
          <Text style={styles.heading}>Revenue</Text>
          <Text style={styles.descriptionText}>{movie?.status}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.heading}>Genres</Text>
        <View style={styles.genres}>
          {movie?.genres.map((genre: string) => (
            <View style={styles.genre} key={genre}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Text style={styles.heading}>Countries</Text>
        <View style={styles.contentList}>
          {countries?.map((country, index) =>
            country !== "" ? (
              <Text style={styles.descriptionText} key={country}>
                {country}
              </Text>
            ) : (
              <Text style={styles.dot} key={index}></Text>
            )
          )}
        </View>
      </View>
      <View style={styles.flexRow}>
        <View>
          <Text style={styles.heading}>Budget</Text>
          <Text style={styles.descriptionText}>
            {formatCurrencyAbbreviation(movie?.budget || "")}
          </Text>
        </View>
        <View>
          <Text style={styles.heading}>Revenue</Text>
          <Text style={styles.descriptionText}>
            {formatCurrencyAbbreviation(movie?.revenue || "")}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.heading}>Tagline</Text>
        <Text style={styles.descriptionText}>{movie?.tagline}</Text>
      </View>
      <View>
        <Text style={styles.heading}>Production Companies</Text>
      </View>
      <View style={styles.contentList}>
        {productionCompanies?.map((productionCompany, index) =>
          productionCompany !== "" ? (
            <Text style={styles.descriptionText} key={productionCompany}>
              {productionCompany}
            </Text>
          ) : (
            <Text style={styles.dot} key={index}></Text>
          )
        )}
      </View>
    </Container>
  );
};

export default DetailContent;

const styles = StyleSheet.create({
  container: {
    marginTop: 90,
  },
  title: {
    color: constants.white,
    fontSize: 20,
    fontWeight: 700,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 10,
  },
  releaseDate: {
    color: constants.light,
    fontSize: 14,
    marginTop: 5,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: constants.light,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    gap: 5,
    backgroundColor: "#221F3D",
    width: 116,
    borderRadius: 4,
    marginVertical: 10,
  },
  ratingImage: {
    width: 14,
    height: 14,
  },
  ratingText: {
    fontSize: 12,
    color: constants.light,
  },
  heading: {
    fontSize: 12,
    color: constants.light,
    marginVertical: 20,
  },
  overviewDescription: {
    fontSize: 14,
    color: constants.white,
    lineHeight: 26.5,
    fontWeight: 400,
    fontFamily: "Inter",
  },
  flexRow: {
    flexDirection: "row",
    gap: 32,
  },
  descriptionText: {
    fontSize: 14,
    color: constants.info,
    marginTop: -10,
    fontWeight: 600,
    lineHeight: 26.5,
    fontFamily: "Inter-bold",
  },
  genres: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 9,
  },
  genre: {
    backgroundColor: "#221F3D",
    borderRadius: 4,
    color: constants.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    height: 24,
  },
  genreText: {
    color: constants.white,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "Inter-bold",
  },
  contentList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    lineHeight: 25,
  },
});
