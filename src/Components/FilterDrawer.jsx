import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";

import Typography from "@mui/joy/Typography";
import Done from "@mui/icons-material/Done";
import { useGlobalCartContext } from "../Context/Context";

export default function FilterDrawer({ open, setOpen }) {
  const { darkMode, selectedFilters, setSelectedFilters, clearAllFilters } =
    useGlobalCartContext();
  console.log(selectedFilters);
  return (
    <React.Fragment>
      <Drawer
        size="md"
        variant="plain"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          content: {
            sx: {
              bgcolor: "transparent",
              p: { md: 3, sm: 0 },
              boxShadow: "none",
            },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
            bgcolor: darkMode && "#363434",
          }}
        >
          <DialogTitle sx={{ color: darkMode && "#fff" }}>Filters</DialogTitle>
          <ModalClose />
          <Divider sx={{ mt: "auto" }} />
          <DialogContent sx={{ gap: 2 }}>
            <Typography
              level="title-md"
              fontWeight="bold"
              sx={{ mt: 1, color: darkMode && "#fff" }}
            >
              Get Delivery In
            </Typography>
            <div role="group" aria-labelledby="rank">
              <List
                size="sm"
                sx={{
                  "--List-gap": "12px",
                  "--ListItem-radius": "20px",
                }}
              >
                {["1 Day", "2 Day", "3 Day", "1 Week"].map((item, index) => {
                  const selected = Array.from(
                    selectedFilters.deliveryDays
                  )?.includes(item);
                  return (
                    <ListItem key={index} sx={{ marginInline: "10px" }}>
                      <AspectRatio
                        variant={selected ? "solid" : "outlined"}
                        color={selected ? "primary" : "neutral"}
                        ratio={1}
                        sx={{
                          width: 20,
                          borderRadius: 20,
                          ml: -0.5,
                          mr: 0.75,
                        }}
                      >
                        <div>{selected && <Done fontSize="md" />}</div>
                      </AspectRatio>
                      <Checkbox
                        sx={{
                          color: darkMode && "#fff",
                          width: "90%",
                        }}
                        size="sm"
                        color="neutral"
                        disableIcon
                        overlay
                        label={item}
                        variant="outlined"
                        checked={selected}
                        onChange={(event) => {
                          setSelectedFilters(
                            "deliveryDays",
                            item,
                            event.target.checked
                          );
                        }}
                        slotProps={{
                          action: {
                            sx: {
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                            },
                          },
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </div>

            <Typography
              level="title-md"
              fontWeight="bold"
              sx={{
                mt: 1,
                color: darkMode && "#fff",
              }}
            >
              Brand
            </Typography>
            <List size="lg">
              {["Apple", "Motorola", "Samsung"].map((brand, index) => {
                const selected = Array.from(
                  selectedFilters.selectedBrand
                )?.includes(brand);
                return (
                  <ListItem key={index}>
                    <Checkbox
                      checked={selected}
                      onChange={(event) => {
                        setSelectedFilters(
                          "selectedBrand",
                          brand,
                          event.target.checked
                        );
                      }}
                      label={brand}
                      sx={{ color: darkMode && "#fff" }}
                    />
                  </ListItem>
                );
              })}
            </List>

            <Typography
              level="title-md"
              fontWeight="bold"
              sx={{
                mt: 1,
                color: darkMode && "#fff",
              }}
            >
              Product Rating
            </Typography>

            <List size="lg">
              {[4, 3, 2, 1].map((rating, index) => {
                const selected = Array.from(
                  selectedFilters.selectedRatings
                )?.includes(rating);
                return (
                  <ListItem key={index}>
                    <Checkbox
                      checked={selected}
                      onChange={(event) => {
                        setSelectedFilters(
                          "selectedRatings",
                          rating,
                          event.target.checked
                        );
                      }}
                      label={
                        <Box
                          sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Rating
                            name="text-feedback"
                            value={rating}
                            readOnly
                            precision={0.5}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                          <Box sx={{ ml: 2 }}>& Above</Box>
                        </Box>
                      }
                      sx={{ color: darkMode && "#fff" }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </DialogContent>

          <Divider sx={{ mt: "auto" }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            useFlexGap
            spacing={1}
          >
            <Button
              sx={{ color: darkMode && "#fff" }}
              onClick={clearAllFilters}
            >
              Clear
            </Button>
            <Button onClick={() => setOpen(false)}>Show 165 Products</Button>
          </Stack>
        </Sheet>
      </Drawer>
    </React.Fragment>
  );
}
